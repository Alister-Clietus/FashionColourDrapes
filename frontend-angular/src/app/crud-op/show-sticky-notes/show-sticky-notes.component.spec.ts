import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStickyNotesComponent } from './show-sticky-notes.component';

describe('ShowStickyNotesComponent', () => {
  let component: ShowStickyNotesComponent;
  let fixture: ComponentFixture<ShowStickyNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStickyNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStickyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
