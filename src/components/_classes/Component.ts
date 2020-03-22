import dompurify from 'dompurify';
import { Store } from '@radapt/oodux';
import { DesignSystems } from '../../DesignSystems';

export class Component {
  element: HTMLElement;
  store: any;
  definition: any;
  options: any;
  id: string;
  refs: any;
  listeners: any[] = [];
  subscribers: any = {};

  constructor(definition, options = {}, store: Store) {
    this.definition = definition;
    this.options = options;
    this.store = store;
    this.id = `e${Math.random().toString(36).substring(7)}`;
  }

  static get properties() {
    return [];
  }

  static get events() {
    return [];
  }

  get refInfo(): any[] {
    return [];
  }

  async build(element: HTMLElement = this.element) {
    await this.init();
    if (element) {
      element = this.replace(element, this.sanitize(this.render()));
      await this.attach(element);
    }
  }

  async init() {
    if ('connect' in this.definition) {
      // Map state properties.
      this.definition.connect.forEach(connection => {
        if ('property' in connection) {
          // Init the property.
          this[connection.property] = this.store[connection.state][connection.property];
          // Subscribe to changes to the property
          this.listeners.push(this.store.subscribe(connection.state, 'change', ({state}) => {
            this[connection.property] = state[connection.property];
          }))
        }
        if ('action' in connection) {
          this.listeners.push(this.on(connection.on, (...data) => {
            if (connection.state in this.store) {
              this.store[connection.state][connection.action](...data);
            }
          }));
        }
      });
    }
  }

  async destroy() {
    // Deregister listeners.
    this.listeners.forEach(listener => listener());
  }

  async rebuild() {
    await this.detach();
    await this.destroy();
    await this.init();
    // Don't bother if we have not built yet.
    if (!this.element || !this.element.parentNode) {
      return;
    }
    this.empty(this.element);
    this.element = this.replace(this.element, this.sanitize(this.render()));
    await this.attach(this.element);
  }

  async attach(element: HTMLElement) {
    this.element = element;
    // Get id from DOM if available. This can occur with SSR.
    if (this.element.id) {
      this.id = this.element.id;
    }
    this.refs = this.loadRefs();
    return;
  }

  async detach() {
    this.refs = {};
  }

  async redraw() {
    // Don't bother if we have not built yet.
    if (!this.element || !this.element.parentNode) {
      return;
    }
    await this.detach();
    this.empty(this.element);
    this.element = this.replace(this.element, this.sanitize(this.render()));
    await this.attach(this.element);
  }

  render(children: string = ''): string {
    if (!children) {
      children = `Unknown component (${this.definition.type})`;
    }
    return this.template('component', {
      children,
    });
  }

  template(name: string, props: any = {}, modes: string[] | string = 'view'): string {
    modes = Array.isArray(modes) ? modes : [modes];
    // Ensure we can always fall back on view.
    if (!modes.includes('view')) {
      modes.push('view');
    }

    const names = [
      `${name}-${this.definition.type}-${this.definition.key}`,
      `${name}-${this.definition.type}`,
      `${name}-${this.definition.key}`,
      `${name}`,
    ];

    const templates = DesignSystems.current;

    let template: (props) => string;
    // Find a name and mode that matches.
    for (const mode of modes) {
      if (template) break; // Short circuit when found.
      for (const name of names) {
        if (template) break; // Short circuit when found.
        if (templates[name] && templates[name][mode]) {
          props.template = {
            name,
            mode,
          };
          template = DesignSystems.current[name][mode];
        }
      }
    }

    // If name and mode is not found render with error.
    if (!template) {
      template = props => `Unknown template: ${props.template.name}`;
      props.template = {
        name: 'unknown',
        mode: 'unknown',
      };
    }

    // Add in general information.
    props = {
      ...this.definition,
      ...props,
      id: this.id,
      parentId: this.options.parentId,
    };

    return template(props);
  }

  sanitize(dirty: string): string {
    return dompurify.sanitize(dirty, {
      ADD_ATTR: ['ref', 'target'],
      USE_PROFILES: { html: true },
      ...(this.options.sanitizeOptions || {}),
    });
  }

  loadRefs(element: HTMLElement = this.element, refs: any[] = this.refInfo): HTMLElement[] {
    return refs.reduce((result, ref) => {
      if (ref.multiple) {
        result[ref.key] = element.querySelectorAll(`[ref="${ref.ref}"]`);
      }
      else {
        result[ref.key] = element.querySelector(`[ref="${ref.ref}"]`) as HTMLElement;
      }
      return result;
    }, {});
  }

  replace(element: HTMLElement = this.element, html: string): HTMLElement {
    // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.
    const parent = element.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, element);
    element.outerHTML = html;
    return parent.children[index] as HTMLElement;
  }

  /**
   * Empty's an HTML DOM element.
   *
   * @param {HTMLElement} element - The element you wish to empty.
   */
  empty(element) {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }

  on(event, callback) {
    this.subscribers[event] = this.subscribers[event] || [];
    this.subscribers[event].push(callback);

    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index !== -1) {
        this.subscribers[event].splice(index, 1);
      }
    }
  }

  emit(event, ...data) {
    return (this.subscribers[event] || []).map(callback => callback(...data));
  }
}
