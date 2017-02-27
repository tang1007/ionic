import { NgModule } from '@angular/core';

import { Col } from './col';
import { Grid } from './grid';
import { Row } from './row';

@NgModule({
  imports: [
  ],
  declarations: [
    Col,
    Grid,
    Row
  ],
  exports: [
    Col,
    Grid,
    Row
  ]
})
export class GridModule {
}
