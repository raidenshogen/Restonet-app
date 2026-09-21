import { TestBed } from '@angular/core/testing';

import { DetailRepasAReservationService } from './detail-repas-areservation.service';

describe('DetailRepasAReservationService', () => {
  let service: DetailRepasAReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailRepasAReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
