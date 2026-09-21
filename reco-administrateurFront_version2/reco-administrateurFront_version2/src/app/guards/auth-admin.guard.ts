import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authAdminGuard: CanActivateFn =
  (route, state) => {
  const router = inject(Router);
  const isAdmin = inject(AuthService).isAdmin();

  if(isAdmin)
    return true;
  else{
    router.navigate(['../admin/PageNotfndAdminComponent']);
    return false;
  }

  return true;


};
