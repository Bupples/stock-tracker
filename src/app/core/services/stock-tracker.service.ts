import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {

  symbolList: string[] = [];
  storedSymbols!: string | null;

  constructor() { }

  public setStockSymbol(symbol: string): void {
    this.symbolList.push(symbol);
    console.log(this.symbolList);
    localStorage.setItem('stockSymbols', JSON.stringify(this.symbolList));
    console.log(localStorage);
    this.storedSymbols = JSON.parse(this.getStockSymbol() || '{}');
    console.log(this.storedSymbols);
  }

  public getStockSymbol(): string | null {
    return localStorage.getItem('stockSymbol');
  }

  public removeStockSymbol(symbol: string): void {
    localStorage.removeItem(symbol);
  }

  public clearStockSymbols(): void {
    localStorage.clear();
  }
}
