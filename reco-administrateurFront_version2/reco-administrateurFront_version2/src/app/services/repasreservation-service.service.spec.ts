import { TestBed } from '@angular/core/testing';

import { RepasreservationServiceService } from './repasreservation-service.service';

describe('RepasreservationServiceService', () => {
  let service: RepasreservationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasreservationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
