import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxWinterLeftComponent } from './color-box-winter-left.component';

describe('ColorBoxWinterLeftComponent', () => {
  let component: ColorBoxWinterLeftComponent;
  let fixture: ComponentFixture<ColorBoxWinterLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxWinterLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxWinterLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
