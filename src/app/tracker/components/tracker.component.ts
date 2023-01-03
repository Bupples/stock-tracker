import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../../stock/components/stock.component';
import { StockTrackerService } from './../../core/services/stock-tracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

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
