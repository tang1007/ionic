import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';

import { Badge } from './badge';

@NgModule({
  imports: [
    ConfigModule
  ],
  declarations: [
    Badge
  ],
  exports: [
    Badge
  ]
})
export class BadgeModule {
}
