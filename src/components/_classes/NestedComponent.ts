import { Component } from './Component';
import { Components } from '../../Components';

export class NestedComponent extends Component {
  sections: any;

  constructor(definition, options, store) {
    super(definition, options, store);
    this.sections = {};
  }

  get sectionsList() {
    if (this.definition.sections) {
      return this.definition.sections.reduce((sections, section) => {
        sections[section] = this.definition[section];
        return sections;
      }, {});
    }
    return {
      components: this.definition.components,
    };
  }

  get refInfo() {
    return [
      ...super.refInfo,
      ...Object.keys(this.sectionsList).map(section => ({
        key: section,
        multiple: true,
        ref: `${section}-${this.id}`
      }))
    ]
  }

  async init() {
    await super.init();
    await Promise.all(Object.keys(this.sectionsList).map(async section => {
      this.sections[section] = this.createComponents(this.sectionsList[section], section);
      return this.initComponents(this.sections[section]);
    }));
  }

  async destroy() {
    await Promise.all(Object.keys(this.sectionsList).map(async section => {
      await this.destroyComponents(this.sections[section]);
      delete this.sections[section];
    }));
    await super.destroy();
  }

  async attach(element: HTMLElement) {
    await super.attach(element);
    await Promise.all(Object.keys(this.sectionsList).map(section => this.attachComponents(this.refs[section], this.sections[section])));
  }

  async detach() {
    await Promise.all(Object.keys(this.sectionsList).map(section => this.detachComponents(this.sections[section])));
    await super.detach();
  }

  createComponents(components, section) {
    return components.map((definition) => {
      let Component = Components.getComponent(definition.type);
      if (!Component) {
        Component = Components.getComponent('component');
      }
      return new Component(definition, {
        ...this.options,
        parentId: `${section}-${this.id}`,
      }, this.store);
    });

  }

  async initComponents(components) {
    return Promise.all(components.map((component) => {
      return component.init();
    }));
  }

  async destroyComponents(components = []) {
    return Promise.all(components.map((component) => {
      return component.destroy();
    }));
  }

  renderComponents(components) {
    return components.map(component => component.render()).join('');
  }

  renderSections() {
    return Object.keys(this.sectionsList).reduce((sections, section) => {
      sections[section] = this.template(section, {
        contents: this.renderComponents(this.sections[section])
      });
      return sections;
    }, {})
  }

  async attachComponents(elements, components) {
    await Promise.all(Array.prototype.map.call(elements, (childElement, index) => {
      return components[index].attach(childElement);
    }));
  }

  async detachComponents(components = []) {
    await Promise.all(components.map((component) => {
      return component.detach();
    }));
  }
}
