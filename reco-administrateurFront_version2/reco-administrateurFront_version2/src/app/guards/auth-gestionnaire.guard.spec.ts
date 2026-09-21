import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGestionnaireGuard } from './auth-gestionnaire.guard';

describe('authGestionnaireGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGestionnaireGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
