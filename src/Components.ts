export class Components {
  static components: any;

  static addComponent(name, Component) {
    Components.components[name] = Component;
  }

  static removeComponent(name) {
    delete Components.components[name];
  }

  static getComponent(name) {
    return Components.components[name];
  }

  static addComponents(components) {
    Components.components = { ...Components.components, ...components };
  }

  static getComponents() {
    return Components.components;
  }
}
