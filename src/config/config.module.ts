import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { Config, setupConfig, ConfigToken } from './config';
import { registerModeConfigs } from './mode-registry';

import { Platform, PlatformModule } from '../platform';

@NgModule({
  imports: [
    PlatformModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ConfigModule {
  static forRoot(config: any = null): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: registerModeConfigs, deps: [ Config ], multi: true },
        { provide: ConfigToken, useValue: config },
        { provide: Config, useFactory: setupConfig, deps: [ ConfigToken, Platform ] },
      ]
    };
  }
}
