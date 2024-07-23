import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxWinterRightComponent } from './color-box-winter-right.component';

describe('ColorBoxWinterRightComponent', () => {
  let component: ColorBoxWinterRightComponent;
  let fixture: ComponentFixture<ColorBoxWinterRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxWinterRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxWinterRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
