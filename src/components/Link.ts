import { Component } from './_classes/Component';

export class Link extends Component {
  static get events() {
    return ['click'];
  }

  render() {
    return super.render(this.template('link', {
    }));
  }

  async attach(element) {
    await super.attach(element);
  }
}
