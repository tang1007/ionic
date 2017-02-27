import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';

import { Chip } from './chip';

@NgModule({
  imports: [
    ConfigModule
  ],
  declarations: [
    Chip
  ],
  exports: [
    Chip
  ]
})
export class ChipModule {
}
