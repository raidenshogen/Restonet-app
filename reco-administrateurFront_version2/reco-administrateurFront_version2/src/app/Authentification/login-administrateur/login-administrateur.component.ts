import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ClientModel} from "../../models/client.model";
import {AuthService} from "../../services/auth.service";
import {TexteAccueilService} from "../../service/texte/texte-accueil.service";

@Component({
  selector: 'app-login-administrateur',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-administrateur.component.html',
  styleUrl: './login-administrateur.component.css'
})
export class LoginAdministrateurComponent implements OnInit{

  error : number = 0;
  user=new ClientModel();
  constructor(private authService : AuthService,  private router: Router)
  { }
  ngOnInit(): void {
  }
  onLoggedin(): void {
    //console.log(this.user)
    let isValidUser : Boolean = this.authService.SignIn(this.user);
    if(isValidUser)
      this.router.navigate(['/admin/ParametresGenerauxAdminComponent'])
    else
      this.error = 1;
  }


}
