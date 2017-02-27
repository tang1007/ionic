import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransitionController } from './transition-controller';

import { ConfigModule } from '../config';
import { PlatformModule } from '../platform';

@NgModule({
  imports: [
    ConfigModule,
    PlatformModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TransitionModule {
  forRoot(): ModuleWithProviders {
    return {
      ngModule: TransitionModule,
      providers: [
        TransitionController
      ]
    };
  }
}
