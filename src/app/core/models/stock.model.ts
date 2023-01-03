import { InsiderSentiment } from './stock-sentiment.model';

export class Stock {
  symbol!: string;
  name!: string;
  percentChange!: number;
  currentPrice!: number;
  openingPrice!: number;
  highPrice!: number;
  lastStockSentiments!: InsiderSentiment[];
}
