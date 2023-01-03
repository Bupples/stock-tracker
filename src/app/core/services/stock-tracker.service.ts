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

  // token to use finnhub's APIs.
  token = 'bu4f8kn48v6uehqi3cqg';
  // finnhub's quote data API url.
  quoteDataUrl = 'https://finnhub.io/api/v1/quote?symbol=';
  // finnhub's symbol lookup API url.
  symbolLookupUrl = 'https://finnhub.io/api/v1/search?q=';
  // finnhub's sentiment API url.
  sentimentUrl = 'https://finnhub.io/api/v1/stock/insider-sentiment?symbol=';

  private allStockList: Stock[] = [];
  private _allStockList = new BehaviorSubject<Stock[]>([]);
  public allStockList$ = this._allStockList.asObservable();

  constructor(private httpClient: HttpClient) { }

  /**
   * Sets a stock symbol in the localStorage and create a stock if
   * it wasn't created yet.
   *
   * @param symbol researched stock.
   */
  public setStockSymbol(symbol: string): void {
    if (!localStorage.getItem(symbol)) {
      localStorage.setItem(symbol, symbol);
      console.log(localStorage);
      this.createStock(symbol);
    }
  }

  /**
   * Removes a symbol from the localStorage and the associated
   * stock from the DOM.
   *
   * @param symbol designated symbol.
   */
  public removeStockSymbol(symbol: string): void {
    localStorage.removeItem(symbol);
    const stockRemoved = this.allStockList.find(stock => stock.symbol === symbol);
    if (stockRemoved) {
      const index = this.allStockList.indexOf(stockRemoved, 0);
      this.allStockList.splice(index, 1);
      this._allStockList.next(this.allStockList);
    }
  }

  /**
   * Utility function to visualize the localStorage
   * in console.
   */
  public viewLocalStorage(): void {
    console.log(localStorage);
  }

  /**
   * Utility function to clear the localStorage and the stockList
   * and visualize the localStorage in console.
   */
  public clearStockSymbols(): void {
    localStorage.clear();
    console.log(localStorage);
    this.allStockList = [];
    this._allStockList.next([]);
  }

  /**
   * Returns the stock quote data of the specified symbols.
   *
   * @param symbol researched symbol.
   * @returns an Observable of the stock quote data.
   */
  public getStockQuoteData(symbol: string): Observable<StockQuoteData> {
    return this.httpClient.get<StockQuoteData>(this.quoteDataUrl.concat(symbol).concat('&token=').concat(this.token)).pipe(
      map((stockQuoteData: StockQuoteData) => ({
        ...stockQuoteData
      }))
    );
  }

  /**
   * Returns the stock symbol lookup of the specified symbols.
   *
   * @param symbol researched symbol.
   * @returns an Observable of the stock symbol lookup.
   */
  public getStockSymbolLookup(symbol: string): Observable<StockSymbolLookup> {
    return this.httpClient.get<StockSymbolLookup>(this.symbolLookupUrl.concat(symbol).concat('&token=').concat(this.token)).pipe(
      map((stockSymbolLookup: StockSymbolLookup) => ({
        ...stockSymbolLookup
      }))
    );
  }

  /**
   * Returns the stock sentiment of the specified symbols for
   * the last three months.
   *
   * @param symbol researched symbol.
   * @returns an Observable of the stock sentiment.
   */
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

  /**
   * Creates a new Stock and updates the list of stock.
   *
   * @param symbol researched symbol.
   */
  public createStock(symbol: string): void {
    const stockSymbolLookup = this.getStockSymbolLookup(symbol);
    const stockQuoteData = this.getStockQuoteData(symbol);
    const stockSentiment = this.getStockSentiment(symbol);
    const stock = new Stock();

    // implements stock data from stockSymbolLookup
    stockSymbolLookup.subscribe(stockSymbolLookup => {
      // here the first result will be the searched one to simplify the process
      const defaultSymbolLookup = stockSymbolLookup.result[0];
      stock.symbol = defaultSymbolLookup.symbol;
      stock.name = defaultSymbolLookup.description;
    });

    // implements stock data from stockQuoteData
    stockQuoteData.subscribe(stockQuoteData => {
      stock.percentChange = stockQuoteData.dp;
      stock.currentPrice = stockQuoteData.c;
      stock.openingPrice = stockQuoteData.o;
      stock.highPrice = stockQuoteData.h;
    });

    // implements stock data from stockSentiment
    stockSentiment.subscribe(stockSentiment => {
      stock.lastStockSentiments = stockSentiment.data;
    });

    this.allStockList.push(stock);
    this._allStockList.next(this.allStockList);
  }

  /**
   * Returns the list of all stock managed with the localStorage.
   *
   * @returns an Observable of the stock list.
   */
  public getAllStocks(): Observable<Stock[]> {
    this.allStockList = [];
    for (const symbol in localStorage) {
      if (localStorage.hasOwnProperty(symbol)) {
        this.createStock(symbol);
      }
    }
    return this.allStockList$;
  }

  /**
   * Returns a stock by his symbol.
   *
   * @param symbol designed symbol.
   * @returns an Observable of the stock or 'undefined' if not found.
   */
  public getStockBySymbol(symbol: string): Observable<Stock> | undefined {
    const found = this.allStockList.find(s => s.symbol === symbol);
    if (found) {
      return of(found);
    } else {
      return;
    }
  }

  /**
   * Utility function to get a correct string format for a date
   * to use the sentimentAPI.
   *
   * @param date date to format.
   * @returns a string representation of the date following the format 'AAAA-MM-DD'.
   */
  private getSentimentDateStringFormat(date: Date): string {
    const dateYearString = date.getFullYear().toString();
    const dateMonthNumber = date.getMonth() + 1;
    const dateMonthString = dateMonthNumber.toString().length > 1 ? dateMonthNumber.toString() : '0' + dateMonthNumber.toString();
    const dateDayString = date.getDate().toString().length > 1 ? date.getDate().toString() : '0' + date.getDate().toString();

    return `${dateYearString}-${dateMonthString}-${dateDayString}`;
  }
}
