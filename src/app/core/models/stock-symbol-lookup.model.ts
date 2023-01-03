export class StockSymbolLookup {
  count!: number;
  result!: SymbolLookupResult[];
}

export class SymbolLookupResult {
  description!: string;
  displaySymbol!: string;
  symbol!: string;
  type!: string;
}
