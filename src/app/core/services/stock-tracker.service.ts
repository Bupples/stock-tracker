import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StockQuoteData } from '../models/stock-quote-data.model';
import { StockSymbolLookup } from './../models/stock-symbol-lookup.model';
import { Stock } from './../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {

  token = 'bu4f8kn48v6uehqi3cqg';
  quoteDataUrl = 'https://finnhub.io/api/v1/quote?symbol=';
  symbolLookupUrl = 'https://finnhub.io/api/v1/search?q=';

  private allStockList: Stock[] = [];
  private _allStockList = new BehaviorSubject<Stock[]>([]);
  public allStockList$ = this._allStockList.asObservable();

  constructor(private httpClient: HttpClient) { }

  public setStockSymbol(symbol: string): void {
    localStorage.setItem(symbol, symbol);
    console.log(localStorage);
    this.getStock(symbol);
  }

  public getStockSymbol(): string | null {
    return localStorage.getItem('stockSymbol');
  }

  public removeStockSymbol(symbol: string): void {
    localStorage.removeItem(symbol);
    const stockRemoved = this.allStockList.find(stock => stock.symbol === symbol);
    if (stockRemoved) {
      const index = this.allStockList.indexOf(stockRemoved, 0);
      this.allStockList.splice(index, 1);
      this._allStockList.next(this.allStockList);
    }
  }

  public viewLocalStorage(): void {
    console.log(localStorage);
  }

  public clearStockSymbols(): void {
    localStorage.clear();
    console.log(localStorage);
    this.allStockList = [];
    this._allStockList.next([]);
  }

  public getStockQuoteData(symbol: string): Observable<StockQuoteData> {
    return this.httpClient.get<StockQuoteData>(this.quoteDataUrl.concat(symbol).concat('&token=').concat(this.token)).pipe(
      map((stockQuoteData: StockQuoteData) => ({
        ...stockQuoteData
      }))
    );
  }

  public getSymbolLookup(symbol: string): Observable<StockSymbolLookup> {
    return this.httpClient.get<StockSymbolLookup>(this.symbolLookupUrl.concat(symbol).concat('&token=').concat(this.token)).pipe(
      map((stockSymbolLookup: StockSymbolLookup) => ({
        ...stockSymbolLookup
      }))
    );
  }

  public getStock(symbol: string): void {
    const symbolLookup = this.getSymbolLookup(symbol);
    const stockQuoteData = this.getStockQuoteData(symbol);
    const stock = new Stock();

    symbolLookup.subscribe(symbolLookup => {
      const defaultSymbolLookup = symbolLookup.result[0];
      stock.symbol = defaultSymbolLookup.symbol;
      stock.name = defaultSymbolLookup.description;
    });

    stockQuoteData.subscribe(stockQuoteData => {
      stock.percentChange = stockQuoteData.dp;
      stock.currentPrice = stockQuoteData.c;
      stock.openingPrice = stockQuoteData.o;
      stock.highPrice = stockQuoteData.h;
    })

    this.allStockList.push(stock);
    this._allStockList.next(this.allStockList);
  }

  public getAllStocks(): Observable<Stock[]> {
    return this.allStockList$;
  }
}
