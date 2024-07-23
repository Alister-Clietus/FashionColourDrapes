import { TestBed } from '@angular/core/testing';

import { ColorChangeService } from './color-change.service';

describe('ColorChangeService', () => {
  let service: ColorChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
