import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css'
})
export class NavBarAdminComponent {

  constructor(public authService : AuthService,  private router: Router ) {
    // Check if we're in browser environment before accessing localStorage
    if (typeof localStorage !== 'undefined') {
      let loggedUser : string;
      let isloggedIn : string;
      loggedUser = localStorage.getItem('loggedUser')!;//placer les donnees qui existent dans localstorage
      isloggedIn = localStorage.getItem('isloggedIn')!;
      if(!loggedUser || isloggedIn == 'false'){
        router.navigate(['login']);
      }
      else
        authService.setLoggedUserLS(loggedUser);
    }
  }

  logout(){
    this.authService.logout();//faire appel au service
  }


}
