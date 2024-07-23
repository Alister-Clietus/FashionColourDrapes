import { TestBed } from '@angular/core/testing';

import { ReMarginService } from './re-margin.service';

describe('ReMarginService', () => {
  let service: ReMarginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReMarginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
