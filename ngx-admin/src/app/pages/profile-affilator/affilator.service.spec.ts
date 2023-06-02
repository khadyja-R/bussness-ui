import { TestBed } from '@angular/core/testing';

import { AffilatorService } from './affilator.service';

describe('AffilatorService', () => {
  let service: AffilatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffilatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
