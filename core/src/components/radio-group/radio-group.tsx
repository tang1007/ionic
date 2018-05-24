import { Component, ComponentDidLoad, Element, Event, EventEmitter, Listen, Prop, Watch } from '@stencil/core';
import { InputChangeEvent, RadioGroupInput } from '../../interface';


@Component({
  tag: 'ion-radio-group'
})
export class RadioGroup implements ComponentDidLoad, RadioGroupInput {

  private inputId = `ion-rg-${radioGroupIds++}`;
  private labelId = `${this.inputId}-lbl`;
  private radios: HTMLIonRadioElement[] = [];

  @Element() el!: HTMLElement;

  /*
   * If true, the radios can be deselected. Default false.
   */
  @Prop() allowEmptySelection = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /*
   * If true, the user cannot interact with the radio group. Default false.
   */
  @Prop() disabled = false;

  @Watch('disabled')
  disabledChanged() {
    for (const radio of this.radios) {
      radio.disabled = this.disabled;
    }
  }

  /**
   * the value of the radio group.
   */
  @Prop({ mutable: true }) value?: string;

  @Watch('value')
  valueChanged(value: string | undefined) {
    this.updateRadios();
    this.ionChange.emit({ value });
  }

  /**
   * Emitted when the value has changed.
   */
  @Event() ionChange!: EventEmitter<InputChangeEvent>;

  @Listen('ionRadioDidLoad')
  onRadioDidLoad(ev: Event) {
    const radio = ev.target as HTMLIonRadioElement;
    radio.name = this.name;

    // add radio to internal list
    this.radios.push(radio);

    // this radio-group does not have a value
    // but this radio is checked, so let's set the
    // radio-group's value from the checked radio
    if (this.value === undefined && radio.checked) {
      this.value = radio.value;
    } else {
      this.updateRadios();
    }
  }

  @Listen('ionRadioDidUnload')
  onRadioDidUnload(ev: Event) {
    const index = this.radios.indexOf(ev.target as HTMLIonRadioElement);
    if (index > -1) {
      this.radios.splice(index, 1);
    }
  }

  @Listen('ionSelect')
  onRadioSelect(ev: Event) {
    const selectedRadio = ev.target as HTMLIonRadioElement;
    if (selectedRadio) {
      this.value = selectedRadio.value;
    }
  }

  componentDidLoad() {
    // Get the list header if it exists and set the id
    // this is used to set aria-labelledby
    let header = this.el.querySelector('ion-list-header');
    if (!header) {
      header = this.el.querySelector('ion-item-divider');
    }
    if (header) {
      const label = header.querySelector('ion-label');
      if (label) {
        this.labelId = label.id = this.name + '-lbl';
      }
    }

    this.disabledChanged();
    this.updateRadios();
  }

  private updateRadios() {
    const value = this.value;
    let hasChecked = false;
    for (const radio of this.radios) {
      if (!hasChecked && radio.value === value) {
        // correct value for this radio
        // but this radio isn't checked yet
        // and we haven't found a checked yet
        hasChecked = true;
        radio.checked = true;
      } else {
        // this radio doesn't have the correct value
        // or the radio group has been already checked
        radio.checked = false;
      }
    }
  }

  hostData() {
    const hostAttrs: any = {
      'role': 'radiogroup'
    };
    if (this.labelId) {
      hostAttrs['aria-labelledby'] = this.labelId;
    }
    return hostAttrs;
  }

}

let radioGroupIds = 0;
