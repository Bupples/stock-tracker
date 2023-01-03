import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StockResearcherModule } from '../stock-researcher/stock-researcher.module';
import { StockModule } from '../stock/stock.module';
import { TrackerComponent } from './components/tracker.component';

@NgModule({
  declarations: [
    TrackerComponent
  ],
  imports: [
    CommonModule,
    StockResearcherModule,
    StockModule
  ],
  exports: [
    TrackerComponent
  ]
})
export class TrackerModule { }
