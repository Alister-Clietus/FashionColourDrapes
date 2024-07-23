import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxRightComponent } from './color-box-right.component';

describe('ColorBoxRightComponent', () => {
  let component: ColorBoxRightComponent;
  let fixture: ComponentFixture<ColorBoxRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
