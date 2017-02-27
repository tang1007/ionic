import { Injector, ModuleWithProviders, NgModule } from '@angular/core';

import { NgModuleLoader } from './ng-module-loader';
import { ModuleLoader, provideModuleLoader } from './module-loader';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LazyLoadingModule {
  forRoot(): ModuleWithProviders {
    return {
      ngModule: LazyLoadingModule,
      providers: [
        { provide: ModuleLoader, useFactory: provideModuleLoader, deps: [NgModuleLoader, Injector]},
        NgModuleLoader
      ]
    };
  }
}
