import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmEditionComponent } from './modal-confirm-edition.component';

describe('ModalConfirmEditionComponent', () => {
  let component: ModalConfirmEditionComponent;
  let fixture: ComponentFixture<ModalConfirmEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
