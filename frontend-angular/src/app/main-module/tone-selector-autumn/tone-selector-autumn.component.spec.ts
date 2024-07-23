import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneSelectorAutumnComponent } from './tone-selector-autumn.component';

describe('ToneSelectorAutumnComponent', () => {
  let component: ToneSelectorAutumnComponent;
  let fixture: ComponentFixture<ToneSelectorAutumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneSelectorAutumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneSelectorAutumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
