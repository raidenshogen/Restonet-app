import { TestBed } from '@angular/core/testing';

import { RepasDataService } from './repas-data.service';

describe('RepasDataService', () => {
  let service: RepasDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
