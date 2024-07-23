import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBoxAutumnLeftComponent } from './color-box-autumn-left.component';

describe('ColorBoxAutumnLeftComponent', () => {
  let component: ColorBoxAutumnLeftComponent;
  let fixture: ComponentFixture<ColorBoxAutumnLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBoxAutumnLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBoxAutumnLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
