import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReceptionsComponent } from './table-receptions.component';

describe('TableReceptionsComponent', () => {
  let component: TableReceptionsComponent;
  let fixture: ComponentFixture<TableReceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableReceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
