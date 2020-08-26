import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDriefComponent } from './search-drief.component';

describe('SearchDriefComponent', () => {
  let component: SearchDriefComponent;
  let fixture: ComponentFixture<SearchDriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
