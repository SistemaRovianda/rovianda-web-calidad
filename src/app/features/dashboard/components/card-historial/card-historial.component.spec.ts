import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistorialComponent } from './card-historial.component';

describe('CardHistorialComponent', () => {
  let component: CardHistorialComponent;
  let fixture: ComponentFixture<CardHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
