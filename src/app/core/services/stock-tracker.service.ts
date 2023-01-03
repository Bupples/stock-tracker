import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { StockQuoteData } from '../models/stock-quote-data.model';
import { StockSentiment } from '../models/stock-sentiment.model';
import { StockSymbolLookup } from './../models/stock-symbol-lookup.model';
import { Stock } from './../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {

  token = 'bu4f8kn48v6uehqi3cqg';
  quoteDataUrl = 'https://finnhub.io/api/v1/quote?symbol=';
  symbolLookupUrl = 'https://finnhub.io/api/v1/search?q=';
  sentimentUrl = 'https://finnhub.io/api/v1/stock/insider-sentiment?symbol=';

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

  public getStockSymbolLookup(symbol: string): Observable<StockSymbolLookup> {
    return this.httpClient.get<StockSymbolLookup>(this.symbolLookupUrl.concat(symbol).concat('&token=').concat(this.token)).pipe(
      map((stockSymbolLookup: StockSymbolLookup) => ({
        ...stockSymbolLookup
      }))
    );
  }

  public getStockSentiment(symbol: string): Observable<StockSentiment> {
    // today is set to december 2022 for test purpose
    const today = new Date("2022-12-01");
    const todayString = this.getSentimentDateStringFormat(today);
    const threeMonthsBeforeNumber = today.setMonth(today.getMonth() - 3);
    const threeMonthsBeforeDate = new Date(threeMonthsBeforeNumber);
    const threeMonthsBeforeString = this.getSentimentDateStringFormat(threeMonthsBeforeDate);

    return this.httpClient.get<StockSentiment>(this.sentimentUrl.concat(symbol).concat('&from=').concat(threeMonthsBeforeString).concat('&to=').concat(todayString).concat('&token=').concat(this.token)).pipe(
      map((stockSentiment: StockSentiment) => ({
        ...stockSentiment
      }))
    );
  }

  public getStock(symbol: string): void {
    const stockSymbolLookup = this.getStockSymbolLookup(symbol);
    const stockQuoteData = this.getStockQuoteData(symbol);
    const stockSentiment = this.getStockSentiment(symbol);
    const stock = new Stock();

    stockSymbolLookup.subscribe(stockSymbolLookup => {
      const defaultSymbolLookup = stockSymbolLookup.result[0];
      stock.symbol = defaultSymbolLookup.symbol;
      stock.name = defaultSymbolLookup.description;
    });

    stockQuoteData.subscribe(stockQuoteData => {
      stock.percentChange = stockQuoteData.dp;
      stock.currentPrice = stockQuoteData.c;
      stock.openingPrice = stockQuoteData.o;
      stock.highPrice = stockQuoteData.h;
    });

    stockSentiment.subscribe(stockSentiment => {
      stock.lastStockSentiments = stockSentiment.data;
    });

    console.log(stock.lastStockSentiments);
    this.allStockList.push(stock);
    this._allStockList.next(this.allStockList);
  }

  public getAllStocks(): Observable<Stock[]> {
    return this.allStockList$;
  }

  public getStockBySymbol(symbol: string): Observable<Stock> | undefined {
    const found = this.allStockList.find(s => s.symbol === symbol);
    if (found) {
      return of(found);
    } else {
      return;
    }
  }

  private getSentimentDateStringFormat(date: Date): string {
    const dateYearString = date.getFullYear().toString();
    const dateMonthNumber = date.getMonth() + 1;
    const dateMonthString = dateMonthNumber.toString().length > 1 ? dateMonthNumber.toString() : '0' + dateMonthNumber.toString();
    const dateDayString = date.getDate().toString().length > 1 ? date.getDate().toString() : '0' + date.getDate().toString();

    return `${dateYearString}-${dateMonthString}-${dateDayString}`;
  }
}
