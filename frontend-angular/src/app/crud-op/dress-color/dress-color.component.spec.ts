import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DressColorComponent } from './dress-color.component';

describe('DressColorComponent', () => {
  let component: DressColorComponent;
  let fixture: ComponentFixture<DressColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DressColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DressColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
