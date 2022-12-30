import { Component, OnDestroy, OnInit } from '@angular/core';
import { StockTrackerService } from './../../core/services/stock-tracker.service';


@Component({
  selector: 'app-stock-researcher',
  templateUrl: './stock-researcher.component.html',
  styleUrls: ['./stock-researcher.component.css']
})
export class StockResearcherComponent implements OnInit, OnDestroy {

  searchedStock!: string;
  stockList!: string[];

  constructor(private stockTrackerService: StockTrackerService) { }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    this.stockTrackerService.clearStockSymbols();
  }

  public onStockSearch(searchedStock: string): void {
    this.stockTrackerService.setStockSymbol(searchedStock);
  }
}
