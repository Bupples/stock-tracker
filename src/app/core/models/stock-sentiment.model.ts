export class StockSentiment {
  symbol!: string;
  data!: InsiderSentiment[];
}

export class InsiderSentiment {
  symbol!: string;
  year!: number;
  month!: number;
  change!: number;
  mspr!: number;
}
