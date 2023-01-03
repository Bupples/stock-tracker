import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockResearcherComponent } from './components/stock-researcher/stock-researcher.component';
import { StockComponent } from './components/stock/stock.component';
import { TrackerListComponent } from './components/tracker-list/tracker-list.component';

@NgModule({
  declarations: [
    TrackerListComponent,
    StockResearcherComponent,
    StockComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TrackerListComponent,
    StockResearcherComponent,
    StockComponent
  ]
})
export class TrackerModule { }
