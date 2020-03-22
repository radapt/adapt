import { NestedComponent } from './_classes/NestedComponent';

export class Page extends NestedComponent {
  render(): string {
    return super.render(this.template('page', {
      components: this.renderComponents(this.sections.components),
    }));
  }
}
