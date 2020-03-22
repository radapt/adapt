import { Component } from './_classes/Component';

export class HTML extends Component {
  render() {
    return super.render(this.definition.value);
  }
}
