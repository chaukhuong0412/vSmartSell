import { TestBed } from '@angular/core/testing';

import { GroupProductTypeService } from './group-product-type.service';

describe('GroupProductTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupProductTypeService = TestBed.get(GroupProductTypeService);
    expect(service).toBeTruthy();
  });
});
