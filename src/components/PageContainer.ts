import { NestedComponent } from './_classes/NestedComponent';

export class PageContainer extends NestedComponent {
  components: any[] = [];
  _page: any;

  constructor(definition, options, store) {
    super(definition, options, store);
    this.page = this.definition.pages[0];
  }

  static get properties() {
    return ['page'];
  }

  get page() {
    return this._page;
  }

  set page(path) {
    if (!this._page || this._page.key !== path) {
      this._page = this.definition.pages.reduce(
        (page, current) => (page || (current.key === path ? current : null)),
        null
      );
      this.rebuild();
    }
  }

  get sectionsList() {
    if (!this.page) {
      return {};
    }
    return {
      page: [this.page],
    };
  }

  render() {
    return super.render(this.sections.page ? this.renderComponents(this.sections.page) : ' ');
  }
}
