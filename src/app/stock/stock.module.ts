import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StockComponent } from './components/stock.component';

@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StockComponent
  ],
})
export class StockModule { }
