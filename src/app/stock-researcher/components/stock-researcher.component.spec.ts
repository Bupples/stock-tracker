import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockResearcherComponent } from './stock-researcher.component';

describe('StockResearcherComponent', () => {
  let component: StockResearcherComponent;
  let fixture: ComponentFixture<StockResearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockResearcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
