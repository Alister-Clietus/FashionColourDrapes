import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneSelectorSummerComponent } from './tone-selector-summer.component';

describe('ToneSelectorSummerComponent', () => {
  let component: ToneSelectorSummerComponent;
  let fixture: ComponentFixture<ToneSelectorSummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneSelectorSummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneSelectorSummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
