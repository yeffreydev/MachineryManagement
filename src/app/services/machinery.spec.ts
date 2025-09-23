import { TestBed } from '@angular/core/testing';

import { Machinery } from './machinery';

describe('Machinery', () => {
  let service: Machinery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Machinery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
