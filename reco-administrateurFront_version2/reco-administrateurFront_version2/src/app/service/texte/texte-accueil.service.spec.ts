import { TestBed } from '@angular/core/testing';

import { TexteAccueilService } from './texte-accueil.service';

describe('TexteAccueilService', () => {
  let service: TexteAccueilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TexteAccueilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
