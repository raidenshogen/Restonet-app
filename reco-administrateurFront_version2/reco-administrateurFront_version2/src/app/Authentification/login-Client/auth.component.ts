import {Component, OnInit} from '@angular/core';
import {TexteAccueilService} from "../../service/texte/texte-accueil.service";
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ClientModel} from "../../models/client.model";
import {AuthService} from "../../services/auth.service";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpClient} from "@angular/common/http";
import { CurrentUserService } from '../../services/current-user.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
  /*error : number = 0;
  user=new ClientModel();
  constructor(private authService : AuthService, public textService: TexteAccueilService, private router: Router)
  { }
  ngOnInit(): void {
  }
  onLoggedin(): void {
    let isValidUser : Boolean = this.authService.SignIn(this.user);
    if(isValidUser)
      this.router.navigate(['/client/ApprovisionnerClientComponent'])
    else
      this.error = 1;
  }

}*/
  constructor(public textService: TexteAccueilService, private router: Router, private http: HttpClient,private userData:CurrentUserService) { }  
  


  ngOnInit(): void {
  }


  clientControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);


  onSubmit() {
  const codeClient = this.clientControl.value;
  const password = this.passwordControl.value;
  const credentials = { codeClient, password };

  this.http.post<any>('https://localhost:8080/auth/login', credentials).subscribe({
    next: (response) => {
      if (response.token) {
        // ✅ Save full response
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('jwtToken', response.token);
       
        // ✅ Extract and save client info separately
        const clientInfo = {
          client: response.client?.client,
          nom: response.client?.nom,
          societe: response.client?.societe,
          unite: response.client?.unite,
          categorieclient: response.client?.categorieclient
        };
        localStorage.setItem('userData', JSON.stringify(clientInfo));
       
        this.router.navigate(['/client/infoscompte']);
      } else if (response.status === 302) {
        this.router.navigate(['/changepassword']);
      }
    },
    error: (err) => {
      console.error('Login failed', err);
      if (err.status === 401) {
        alert('Code client ou mot de passe incorrect.');
      } else if (err.status === 404) {
        alert('Code client non existant.');
      } else {
        alert('Erreur d\'authentification.');
      }
    }
  });
}


}
