import { TestBed } from '@angular/core/testing';

import { StockTrackerService } from './stock-tracker.service';

describe('StockTrackerService', () => {
  let service: StockTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
