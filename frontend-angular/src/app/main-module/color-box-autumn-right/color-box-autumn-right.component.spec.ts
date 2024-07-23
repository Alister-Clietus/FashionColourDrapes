import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxAutumnRightComponent } from './color-box-autumn-right.component';

describe('ColorBoxAutumnRightComponent', () => {
  let component: ColorBoxAutumnRightComponent;
  let fixture: ComponentFixture<ColorBoxAutumnRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxAutumnRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxAutumnRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
