import { TestBed } from '@angular/core/testing';

import { DressVisibilityService } from './dress-visibility.service';

describe('DressVisibilityService', () => {
  let service: DressVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DressVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
