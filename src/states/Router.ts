import { State } from '@radapt/oodux';

export class Router extends State {
  getters = {
    currentPage: (state) => state.page,
  };

  actions = {
    navigate: (page) => this.store.dispatch({
      type: 'SET_PAGE',
      page,
    }),
  };

  reduce(state = this.defaultState, payload) {
    switch (payload.type) {
      case 'SET_PAGE':
        return {
          ...state,
          page: payload.page,
        };
      default:
        return state;
    }
  }
}
