export class DesignSystems {
  static _designSystems: any;
  static _designSystem: string = 'bootstrap4';
  static _current: any;

  static addDesignSystem(name, DesignSystem) {
    DesignSystems._designSystems[name] = DesignSystem;
  }

  static removeDesignSystem(name) {
    delete DesignSystems._designSystems[name];
  }

  static getDesignSystem(name) {
    return DesignSystems._designSystems[name];
  }

  static addDesignSystems(designSystems) {
    DesignSystems._designSystems = { ...DesignSystems._designSystems, ...designSystems };
  }

  static getDesignSystems() {
    return DesignSystems._designSystems;
  }

  static get current() {
    return DesignSystems._current || DesignSystems.default;
  }

  static get default() {
    return DesignSystems._designSystems[DesignSystems._designSystem];
  }

  static set designSystem(designSystem: string) {
    if (DesignSystems._designSystems.hasOwnProperty(designSystem)) {
      DesignSystems._designSystem = designSystem;
      DesignSystems._current = DesignSystems._designSystems[designSystem];
    }
  }

  static get designSystem() {
    return DesignSystems._designSystem;
  }
}
