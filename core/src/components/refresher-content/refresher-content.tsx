import { Component, Prop } from '@stencil/core';
import { Config } from '../../interface';

@Component({
  tag: 'ion-refresher-content'
})
export class RefresherContent {

  @Prop({ context: 'config' }) config!: Config;

  /**
   * A static icon to display when you begin to pull down
   */
  @Prop({ mutable: true }) pullingIcon?: string;

  /**
   * The text you want to display when you begin to pull down
   */
  @Prop() pullingText?: string;

  /**
   * An animated SVG spinner that shows when refreshing begins
   */
  @Prop({ mutable: true }) refreshingSpinner?: string;

  /**
   * The text you want to display when performing a refresh
   */
  @Prop() refreshingText?: string;


  protected componentDidLoad() {
    if (!this.pullingIcon) {
      this.pullingIcon = this.config.get('ionPullIcon', 'arrow-down');
    }
    if (!this.refreshingSpinner) {
      this.refreshingSpinner = this.config.get('ionRefreshingSpinner', this.config.get('spinner', 'lines'));
    }
  }

  protected render() {
    return [
      <div class="refresher-pulling">
        {this.pullingIcon &&
          <div class="refresher-pulling-icon">
            <ion-icon icon={this.pullingIcon}></ion-icon>
          </div>
        }
        {this.pullingText &&
          <div class="refresher-pulling-text" innerHTML={this.pullingText}></div>
        }
      </div>,
      <div class="refresher-refreshing">
        {this.refreshingSpinner &&
          <div class="refresher-refreshing-icon">
            <ion-spinner name={this.refreshingSpinner}></ion-spinner>
          </div>
        }
        {this.refreshingText &&
          <div class="refresher-refreshing-text" innerHTML={this.refreshingText}></div>
        }
      </div>
    ];
  }
}
