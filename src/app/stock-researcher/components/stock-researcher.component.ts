import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-stock-researcher',
  templateUrl: './stock-researcher.component.html',
  styleUrls: ['./stock-researcher.component.css']
})
export class StockResearcherComponent implements OnInit, OnDestroy {
  @Output() symbol = new EventEmitter<string>();
  searchedStock!: string;

  constructor() { }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
  }

  public onStockSearch(searchedStock: string): void {
    this.symbol.emit(searchedStock);
  }
}
