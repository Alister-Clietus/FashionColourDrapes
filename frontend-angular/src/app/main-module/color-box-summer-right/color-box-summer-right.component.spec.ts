import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxSummerRightComponent } from './color-box-summer-right.component';

describe('ColorBoxSummerRightComponent', () => {
  let component: ColorBoxSummerRightComponent;
  let fixture: ComponentFixture<ColorBoxSummerRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxSummerRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxSummerRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
