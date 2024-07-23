import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneSelectorComponent } from './tone-selector.component';

describe('ToneSelectorComponent', () => {
  let component: ToneSelectorComponent;
  let fixture: ComponentFixture<ToneSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
