import { Injectable } from '@angular/core';
import {ClientModel} from "../models/client.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users : ClientModel[] = [
    {client:"CL001", motdepasseintranet:"pass123",email:"zz13092002@gmail.com",roles:['Client','CREATE']},
    {client:"Houda", motdepasseintranet:"a.123",roles:['Admin', 'ADMIN']},
  ];
  public loggedUser! : string;
  public isloggedIn : Boolean = false;
  public roles! : string[];
 private passwordResetAttempts: Map<string, { count: number, lastAttempt: number }> = new Map();

  constructor( private router : Router) {
  }

  SignIn(user: ClientModel) {
    let validUser: boolean = false;
    this.users.forEach(u => {

      if (u.client && user.client == u.client && user.motdepasseintranet == u.motdepasseintranet) {
        validUser = true;
        this.loggedUser = u.client;
        this.isloggedIn = true;
        this.roles = u.roles!;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

 isCreate(){
    if(!this.roles)
       return false
   return (this.roles.indexOf('CREATE')>-1);
 }

  isAdmin(){
    if(!this.roles)
      return false
    return (this.roles.indexOf('ADMIN')>-1);
  }

  logout(){
     this.loggedUser = undefined!;
     this.isloggedIn = false;
     this.roles = undefined!;
     localStorage.removeItem('loggedUser');
     localStorage.removeItem('isloggedIn');
    this.router.navigate(['/login']);
 }

 setLoggedUserLS(login : string){
    this.loggedUser = login;
    this.isloggedIn = true;
     this.getRoles(login);
      }

 getRoles(username : string){
    this.users.forEach(u =>{
      if(u.matricule == username)
        this.roles = u.roles!;
   })

 }
 
  }

