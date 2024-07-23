import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxSpringLeftComponent } from './color-box-spring-left.component';

describe('ColorBoxSpringLeftComponent', () => {
  let component: ColorBoxSpringLeftComponent;
  let fixture: ComponentFixture<ColorBoxSpringLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxSpringLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxSpringLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
