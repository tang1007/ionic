import { Component, Element, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';


@Component({
  tag: 'ion-img',
  styleUrl: 'img.scss'
})
export class Img {

  private io?: IntersectionObserver;

  @Element() el!: HTMLElement;

  @State() loadSrc?: string;

  /**
   * This attribute defines the alternative text describing the image.
   * Users will see this text displayed if the image URL is wrong,
   * the image is not in one of the supported formats, or if the image is not yet downloaded.
   */
  @Prop() alt?: string;

  /**
   * The image URL. This attribute is mandatory for the <img> element.
   */
  @Prop() src?: string;
  @Watch('src')
  srcChanged() {
    this.addIO();
  }

  @Event() ionImgDidLoad!: EventEmitter<void>;

  componentDidLoad() {
    this.addIO();
  }

  private addIO() {
    if (!this.src) {
      return;
    }
    if ('IntersectionObserver' in window) {
      this.removeIO();
      this.io = new IntersectionObserver((data) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[0].isIntersecting) {
          this.loadSrc = this.src;
          this.removeIO();
          this.ionImgDidLoad.emit();
        }
      });

      this.io.observe(this.el);
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.loadSrc = this.src, 200);
    }
  }

  private removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  render() {
    return (
      <img
        src={this.loadSrc}
        alt={this.alt}
        decoding="async"></img>
    );
  }
}
