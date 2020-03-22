export class States {
  static states: any;

  static addState(name, State) {
    States.states[name] = State;
  }

  static removeState(name) {
    delete States.states[name];
  }

  static getState(name) {
    return States.states[name];
  }

  static addStates(states) {
    States.states = { ...States.states, ...states };
  }

  static getStates() {
    return States.states;
  }
}
