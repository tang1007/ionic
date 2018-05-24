import { Component, Element, Prop, Watch } from '@stencil/core';


@Component({
  tag: 'ion-fab-list',
  styleUrl: 'fab-list.scss'
})
export class FabList {
  @Element() el!: HTMLIonFabElement;

  /**
   * If true, the fab list will be show all fab buttons in the list. Defaults to `false`.
   */
  @Prop() activated = false;

  @Watch('activated')
  protected activatedChanged(activated: boolean) {
    const fabs = Array.from(this.el.querySelectorAll('ion-fab-button'));

    // if showing the fabs add a timeout, else show immediately
    const timeout = activated ? 30 : 0;
    fabs.forEach((fab, i) => {
      setTimeout(() => fab.show = activated, i * timeout);
    });
  }

  /**
   * The side the fab list will show on relative to the main fab button. Defaults to `'bottom'`.
   */
  @Prop() side: 'start' | 'end' | 'top' | 'bottom' = 'bottom';


  hostData() {
    return {
      class: {
        'fab-list-active': this.activated,
        [`fab-list-side-${this.side}`]: this.side
      }
    };
  }

}
