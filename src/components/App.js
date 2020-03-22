import { NestedComponent } from './_classes/NestedComponent';
import {Components} from "../Components";

export class App extends NestedComponent {
  render() {
    return super.render(this.template('app', {
      ...super.renderSections(),
    }));
  }
}
