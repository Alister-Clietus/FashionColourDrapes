import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxSpringRightComponent } from './color-box-spring-right.component';

describe('ColorBoxSpringRightComponent', () => {
  let component: ColorBoxSpringRightComponent;
  let fixture: ComponentFixture<ColorBoxSpringRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxSpringRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxSpringRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
