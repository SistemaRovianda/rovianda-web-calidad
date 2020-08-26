import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPackagingComponent } from './search-packaging.component';

describe('SearchPackagingComponent', () => {
  let component: SearchPackagingComponent;
  let fixture: ComponentFixture<SearchPackagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
