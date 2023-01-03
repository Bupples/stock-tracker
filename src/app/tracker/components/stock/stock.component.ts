import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/app/core/models/stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @Input() stock!: Stock;
  @Output() symbol = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Navigates to the specified sentiment route on click.
   */
  public onViewSentimentDetail(): void {
    this.router.navigateByUrl(`sentiment/${this.stock.symbol}`)
  }

  /**
   * Raises an event when the 'delete' button is clicked to remove the stock.
   */
  public onRemoveStock(symbol: string): void {
    this.symbol.emit(symbol);
  }
}
export { Stock };
