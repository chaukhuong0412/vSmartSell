import { TestBed } from '@angular/core/testing';

import { StoreConfigService } from './store-config.service';

describe('StoreConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreConfigService = TestBed.get(StoreConfigService);
    expect(service).toBeTruthy();
  });
});
