import { Store } from '@radapt/oodux';
import { Components } from './Components';
import { DesignSystems } from './DesignSystems';
import { States } from './States';
import components from './components/index';
import designSystems from './designSystems/index';
import states from './states/index';

Components.addComponents(components);
DesignSystems.addDesignSystems(designSystems);
States.addStates(states);

export class Adapt {
  public ready: Promise<void>;
  private root: any;

  static use(modules) {
    // module usage.
  }

  /**
   * Instantiates the correct root object and returns it.
   *
   * @param container
   * @param definition
   * @param options
   */
  constructor(container, definition, options) {
    if (container) {
      const div = document.createElement('div');
      container.appendChild(div);
      container = div;
    }

    const initialState = {
      router: {
        page: 'page1'
      }
    };
    const store = new Store(initialState);

    Object.keys(definition.store).forEach((key) => {
      store.registerState(key, States.getState(key), definition.store[key])
    });

    const rootComponent = definition.component;
    const Component = Components.getComponent(rootComponent.type);
    const app = new Component(rootComponent, options, store);
    app.ready = app.build(container);
    return app;
  }
}
