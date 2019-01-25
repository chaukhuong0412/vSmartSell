import { TestBed } from '@angular/core/testing';

import { WaveTypeService } from './wave-type.service';

describe('WaveTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaveTypeService = TestBed.get(WaveTypeService);
    expect(service).toBeTruthy();
  });
});
