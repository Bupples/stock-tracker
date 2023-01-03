import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/core/models/stock.model';
import { StockTrackerService } from './../../core/services/stock-tracker.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {
  stock$!: Observable<Stock> | undefined;

  constructor(private stockTrackerService: StockTrackerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const stockSymbol = this.route.snapshot.params['symbol'];
    this.stock$ = this.stockTrackerService.getStockBySymbol(stockSymbol);
  }
}
