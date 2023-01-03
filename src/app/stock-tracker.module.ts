import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StockResearcherModule } from './stock-researcher/stock-researcher.module';
import { StockModule } from './stock/stock.module';
import { TrackerModule } from './tracker/tracker.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrackerModule,
    StockResearcherModule,
    StockModule
  ],
  exports: [
    TrackerModule,
    StockResearcherModule,
    StockModule
  ]
})
export class StockTrackerModule { }
