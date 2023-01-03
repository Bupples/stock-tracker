import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockTrackerService } from '../../../core/services/stock-tracker.service';
import { Stock } from '../stock/stock.component';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.css']
})
export class TrackerListComponent implements OnInit {

  listStocks$!: Observable<Stock[]>;

  constructor(private stockTrackerService: StockTrackerService) { }

  public ngOnInit(): void {
    this.listStocks$ = this.stockTrackerService.getAllStocks();
  }

  public receivedSymbol(symbol: string): void {
    this.stockTrackerService.setStockSymbol(symbol);
  }

  public receivedRemoveInstruction(symbol: string): void {
    this.stockTrackerService.removeStockSymbol(symbol);
  }

  public onClearLocalStorage(): void {
    this.stockTrackerService.clearStockSymbols();
  }

  public onViewLocalStorage(): void {
    this.stockTrackerService.viewLocalStorage();
  }

}
