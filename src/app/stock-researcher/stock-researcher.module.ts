import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockResearcherComponent } from './components/stock-researcher.component';

@NgModule({
  declarations: [
    StockResearcherComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    StockResearcherComponent
  ]
})
export class StockResearcherModule { }
