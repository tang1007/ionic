import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';
import { FormModule } from '../../util/form';

import { DateTime } from './datetime';

@NgModule({
  imports: [
    ConfigModule,
    FormModule
  ],
  declarations: [
    DateTime
  ],
  exports: [
    DateTime
  ]
})
export class DateTimeModule {
}
