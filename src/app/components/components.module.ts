import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { GraphDoughnutComponent } from './graph-doughnut/graph-doughnut.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    IncrementerComponent,
    GraphDoughnutComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [
    IncrementerComponent,
    GraphDoughnutComponent,
    LoadingComponent,
  ]
})
export class ComponentsModule { }
