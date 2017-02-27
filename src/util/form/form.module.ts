import { ModuleWithProviders, NgModule } from '@angular/core';

import { Form } from './form';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FormModule {
  forRoot(): ModuleWithProviders {
    return {
      ngModule: FormModule,
      providers: [
        Form
      ]
    };
  }
}
