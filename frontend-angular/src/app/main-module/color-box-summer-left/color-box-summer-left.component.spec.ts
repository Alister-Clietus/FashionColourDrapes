import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxSummerLeftComponent } from './color-box-summer-left.component';

describe('ColorBoxSummerLeftComponent', () => {
  let component: ColorBoxSummerLeftComponent;
  let fixture: ComponentFixture<ColorBoxSummerLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxSummerLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxSummerLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
