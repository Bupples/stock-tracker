import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-stock-researcher',
  templateUrl: './stock-researcher.component.html',
  styleUrls: ['./stock-researcher.component.css']
})
export class StockResearcherComponent implements OnInit {
  @Output() symbol = new EventEmitter<string>();
  searchedStock!: string;

  constructor() { }

  ngOnInit(): void { }

  /**
   * Raises an event when the user search a symbol.
   *
   * @param searchedStock stock to search.
   */
  public onStockSearch(searchedStock: string): void {
    this.symbol.emit(searchedStock);
  }
}
