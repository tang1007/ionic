import { ANALYZE_FOR_ENTRY_COMPONENTS, Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { APP_BASE_HREF, Location, LocationStrategy, HashLocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { App } from './app';
import { AppRootToken } from './app-root';

import { Config, ConfigModule } from '../../config';


@NgModule({
  imports: [
    ConfigModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AppModule {
  static forRoot(appRoot: any): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        { provide: AppRootToken, useValue: appRoot },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: appRoot, multi: true },
        { provide: APP_BASE_HREF, useValue: '/'},
        { provide: LocationStrategy, useFactory: provideLocationStrategy, deps: [ PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], Config ] },
        App,
        Location
      ]
    };
  }
}

/**
 * @private
 */
export function provideLocationStrategy(platformLocationStrategy: PlatformLocation, baseHref: string, config: Config) {
  return config.get('locationStrategy') === 'path' ?
         new PathLocationStrategy(platformLocationStrategy, baseHref) :
         new HashLocationStrategy(platformLocationStrategy, baseHref);
}
