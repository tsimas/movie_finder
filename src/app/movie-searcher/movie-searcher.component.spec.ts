import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesearcherComponent } from './movie-searcher.component';

describe('MoviesearcherComponent', () => {
  let component: MoviesearcherComponent;
  let fixture: ComponentFixture<MoviesearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
