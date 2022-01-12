import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReceptionsFilterComponent } from './table-receptions-filter.component';

describe('TableReceptionsFilterComponent', () => {
  let component: TableReceptionsFilterComponent;
  let fixture: ComponentFixture<TableReceptionsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableReceptionsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReceptionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
