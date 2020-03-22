import { Component } from './_classes/Component';

export class Navigation extends Component {
  private _page: string;

  static get properties() {
    return ['page'];
  }

  static get events() {
    return ['click'];
  }

  get refInfo() {
    return [
      ...super.refInfo,
      ...this.definition.links.map((link) => ({
        ref: link.key,
        key: link.key,
        multiple: true,
      })),
    ]
  }

  async init() {
    await super.init();
    // this.store.subscribe('router', 'change', () => this.redraw());
  }

  get page() {
    return this._page || '';
  }

  set page(page) {
    if (page !== this.page) {
      this._page = page;
      this.redraw();
    }
  }

  render(children: string = ''): string {
    return super.render(this.template('navigation', {
      children,
      links: this.definition.links.map((link, index) => ({
        ...link,
        active: this.page.startsWith(link.path),
        disabled: false,
      }))
    }));
  }

  async attach(element) {
    await super.attach(element);

    this.definition.links.forEach((link) => {
      Array.prototype.forEach.call(this.refs[link.key], (anchor) => {
        anchor.addEventListener('click', (event) => {
          event.preventDefault();
          this.emit('click', link.path);
        });
      })
    })
  }
}
