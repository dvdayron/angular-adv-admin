import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { GraphDoughnutComponent } from './graph-doughnut/graph-doughnut.component';

@NgModule({
  declarations: [
    IncrementerComponent,
    GraphDoughnutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [
    IncrementerComponent,
    GraphDoughnutComponent,
  ]
})
export class ComponentsModule { }
