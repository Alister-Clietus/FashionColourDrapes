import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneSelectorSpringComponent } from './tone-selector-spring.component';

describe('ToneSelectorSpringComponent', () => {
  let component: ToneSelectorSpringComponent;
  let fixture: ComponentFixture<ToneSelectorSpringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneSelectorSpringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneSelectorSpringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
