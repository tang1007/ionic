import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { ConfigModule } from '../../config';

import { Checkbox } from './checkbox';

@NgModule({
  imports: [
    ButtonModule,
    ConfigModule
  ],
  declarations: [
    Checkbox
  ],
  exports: [
    Checkbox
  ]
})
export class CheckboxModule {
}
