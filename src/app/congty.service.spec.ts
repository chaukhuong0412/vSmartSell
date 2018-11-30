import { TestBed } from '@angular/core/testing';

import { CongtyService } from './congty.service';

describe('CongtyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CongtyService = TestBed.get(CongtyService);
    expect(service).toBeTruthy();
  });
});
