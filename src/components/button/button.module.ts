import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';

import { Button } from './button';

@NgModule({
  imports: [
    ConfigModule
  ],
  declarations: [
    Button
  ],
  exports: [
    Button
  ]
})
export class ButtonModule {
}
