import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { Events, setupProvideEvents } from './events';

import { DomController, Platform, PlatformModule } from '../../platform';

@NgModule({
  imports: [
    PlatformModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EventsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EventsModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: setupProvideEvents, deps: [ Platform, DomController ], multi: true },
        Events,
      ]
    };
  }
}
