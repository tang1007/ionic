import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { DomController } from './dom-controller';
import { GestureController } from './gesture-controller';
import { Keyboard } from './keyboard';
import { Platform, setupPlatform } from './platform';
import { PlatformConfigToken, providePlatformConfigs } from './platform-registry';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PlatformModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PlatformModule,
      providers: [
        { provide: PlatformConfigToken, useFactory: providePlatformConfigs },
        { provide: Platform, useFactory: setupPlatform, deps: [ DOCUMENT, PlatformConfigToken, NgZone ] },
        DomController,
        GestureController,
        Keyboard
      ]
    };
  }
}
