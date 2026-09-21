import { CanActivateFn } from '@angular/router';

export const authGestionnaireGuard: CanActivateFn = (route, state) => {
  return true;
};
