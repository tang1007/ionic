import { NgModule } from '@angular/core';

import { ConfigModule } from '../../config';

import { CardContent } from './card-content';
import { CardHeader } from './card-header';
import { CardTitle } from './card-title';
import { Card } from './card';

@NgModule({
  imports: [
    ConfigModule
  ],
  declarations: [
    CardContent,
    CardHeader,
    CardTitle,
    Card
  ],
  exports: [
    CardContent,
    CardHeader,
    CardTitle,
    Card
  ]
})
export class CardModule {
}
