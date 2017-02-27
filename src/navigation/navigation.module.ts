import { ComponentFactoryResolver, ModuleWithProviders, NgModule } from '@angular/core';

import { DeepLinker, setupDeepLinker } from './deep-linker';
import { DeepLinkConfig } from './nav-util';
import { DeepLinkConfigToken, setupUrlSerializer, UrlSerializer } from './url-serializer';

import { App, AppModule } from '../components/app';

@NgModule({
  imports: [
    AppModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class NavigationModule {
  forRoot(deepLinkConfig: DeepLinkConfig = null): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        { provide: DeepLinkConfigToken, useValue: deepLinkConfig },
        { provide: UrlSerializer, useFactory: setupUrlSerializer, deps: [ DeepLinkConfigToken ] },
        { provide: DeepLinker, useFactory: setupDeepLinker, deps: [ App, UrlSerializer, Location,  ModuleLoader, ComponentFactoryResolver ] },
      ]
    };
  }
}
