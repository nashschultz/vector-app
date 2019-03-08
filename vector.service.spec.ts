import { TestBed } from '@angular/core/testing';

import { VectorService } from './vector.service';

describe('VectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VectorService = TestBed.get(VectorService);
    expect(service).toBeTruthy();
  });
});
