import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';
import { PlatformModule } from '../../platform';

import { FabContainer } from './fab-container';
import { FabList } from './fab-list';
import { FabButton } from './fab';

@NgModule({
  imports: [
    ConfigModule,
    PlatformModule
  ],
  declarations: [
    FabContainer,
    FabList,
    FabButton
  ],
  exports: [
    FabContainer,
    FabList,
    FabButton
  ]
})
export class FabModule {
}
