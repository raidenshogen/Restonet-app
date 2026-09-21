import { TestBed } from '@angular/core/testing';

import { RepasreservationService } from './repasreservation.service';

describe('RepasreservationService', () => {
  let service: RepasreservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasreservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
