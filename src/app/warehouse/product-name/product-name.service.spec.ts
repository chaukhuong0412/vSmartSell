import { TestBed } from '@angular/core/testing';

import { ProductNameService } from './product-name.service';

describe('ProductNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductNameService = TestBed.get(ProductNameService);
    expect(service).toBeTruthy();
  });
});
