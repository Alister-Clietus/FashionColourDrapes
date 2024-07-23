import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneSelectorWinterComponent } from './tone-selector-winter.component';

describe('ToneSelectorWinterComponent', () => {
  let component: ToneSelectorWinterComponent;
  let fixture: ComponentFixture<ToneSelectorWinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneSelectorWinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneSelectorWinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
