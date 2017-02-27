import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';
import { PlatformModule } from '../../platform';

import { Content } from './content';

@NgModule({
  imports: [
    ConfigModule,
    PlatformModule
  ],
  declarations: [
    Content
  ],
  exports: [
    Content
  ]
})
export class ContentModule {
}
