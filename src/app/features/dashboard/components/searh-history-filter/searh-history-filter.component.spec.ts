import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhHistoryFilterComponent } from './searh-history-filter.component';

describe('SearhHistoryFilterComponent', () => {
  let component: SearhHistoryFilterComponent;
  let fixture: ComponentFixture<SearhHistoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearhHistoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
