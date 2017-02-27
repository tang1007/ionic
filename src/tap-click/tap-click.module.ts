import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core';

import { App } from '../components/app';
import { Config, ConfigModule } from '../config';
import { DomController, GestureController, Platform, PlatformModule } from '../platform';

import { Haptic } from './haptic';
import { setupTapClick } from './tap-click';

@NgModule({
  imports: [
    ConfigModule,
    PlatformModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TapClickModule {
  forRoot(): ModuleWithProviders {
    return {
      ngModule: TapClickModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: setupTapClick, deps: [ Config, Platform, DomController, App, NgZone, GestureController ], multi: true },
        Haptic
      ]
    };
  }
}
