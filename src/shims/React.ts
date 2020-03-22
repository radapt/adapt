import { Component } from '../components/_classes/Component';

export class ReactShim extends Component {
  private reactElement: NodeListOf<HTMLElement> | HTMLElement;
  /**
   * The second phase of component building where the component is rendered as an HTML string.
   *
   * @returns {string} - The return is the full string of the component
   */
  render() {
    // For react components, we simply render as a div which will become the react instance.
    // By calling super.render(string) it will wrap the component with the needed wrappers to make it a full component.
    return super.render(`<div ref="react-${this.id}"></div>`);
  }

  /**
   * The third phase of component building where the component has been attached to the DOM as 'element' and is ready
   * to have its javascript events attached.
   *
   * @param element
   * @returns {Promise<void>} - Return a promise that resolves when the attach is complete.
   */
  attach(element: HTMLElement) {
    super.attach(element);

    // The loadRefs function will find all dom elements that have the "ref" setting that match the object property.
    // It can load a single element or multiple elements with the same ref.
    // this.reactElement = this.findRef(this.element, `react-${this.id}`, false);

    // if (this.refs[`react-${this.id}`]) {
    //   this.reactInstance = this.attachReact(this.refs[`react-${this.id}`]);
    //   if (this.shouldSetValue) {
    //     this.setValue(this.dataForSetting);
    //     this.updateValue(this.dataForSetting);
    //   }
    // }
    return Promise.resolve();
  }
}
