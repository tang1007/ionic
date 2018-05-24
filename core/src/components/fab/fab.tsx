import { Component, Element, Listen, Method, Prop, Watch } from '@stencil/core';


@Component({
  tag: 'ion-fab',
  styleUrl: 'fab.scss'
})
export class Fab {

  @Element() el!: HTMLElement;

  /**
   * Where to align the fab horizontally in the viewport.
   * Possible values are: `"center"`, `"start"`, `"end"`.
   */
  @Prop() horizontal?: 'start' | 'end' | 'center';

  /**
   * Where to align the fab vertically in the viewport.
   * Possible values are: `"top"`, `"center"`, `"bottom"`.
   */
  @Prop() vertical?: 'top' | 'bottom' | 'center';

  /**
   * If true, the fab will display on the edge of the header if
   * `vertical` is `"top"`, and on the edge of the footer if
   * it is `"bottom"`. Should be used with a `fixed` slot.
   */
  @Prop() edge = false;

  @Prop({ mutable: true }) activated = false;
  @Watch('activated')
  activatedChanged() {
    const activated = this.activated;
    const fab = this.el.querySelector('ion-fab-button');
    if (fab) {
      fab.activated = activated;
    }
    Array.from(this.el.querySelectorAll('ion-fab-list')).forEach(list => {
      list.activated = activated;
    });
  }

  componentDidLoad() {
    this.activatedChanged();
  }

  @Listen('click')
  onClick() {
    const hasList = !!this.el.querySelector('ion-fab-list');
    if (hasList) {
      this.activated = !this.activated;
    }
  }

  /**
   * Close an active FAB list container
   */
  @Method()
  close() {
    this.activated = false;
  }

  hostData() {
    return {
      class: {
        [`fab-horizontal-${this.horizontal}`]: !!this.horizontal,
        [`fab-vertical-${this.vertical}`]: !!this.vertical,
        ['fab-edge']: this.edge
      }
    };
  }

}
