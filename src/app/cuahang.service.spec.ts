import { TestBed } from '@angular/core/testing';

import { CuahangService } from './cuahang.service';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuahangService = TestBed.get(CuahangService);
    expect(service).toBeTruthy();
  });
});
