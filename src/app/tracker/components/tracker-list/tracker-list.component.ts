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

  ngOnInit(): void {
    // load all stocks when landing on the 'main' page.
    this.listStocks$ = this.stockTrackerService.getAllStocks();
  }

  /**
   * Manages the 'search stock' event.
   *
   * @param symbol searched stock symbol.
   */
  public receivedSymbol(symbol: string): void {
    this.stockTrackerService.setStockSymbol(symbol);
  }

  /**
   * Manages the 'remove stock' event.
   *
   * @param symbol stock symbol to be removed.
   */
  public receivedRemoveInstruction(symbol: string): void {
    this.stockTrackerService.removeStockSymbol(symbol);
  }

  /**
   * Clears the localStorage on button click.
   */
  public onClearLocalStorage(): void {
    this.stockTrackerService.clearStockSymbols();
  }

  /**
   * Vizualizes the localStorage in console on button click.
   */
  public onViewLocalStorage(): void {
    this.stockTrackerService.viewLocalStorage();
  }
}
