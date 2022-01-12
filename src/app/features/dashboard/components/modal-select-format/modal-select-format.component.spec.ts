import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectFormatComponent } from './modal-select-format.component';

describe('ModalSelectFormatComponent', () => {
  let component: ModalSelectFormatComponent;
  let fixture: ComponentFixture<ModalSelectFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
