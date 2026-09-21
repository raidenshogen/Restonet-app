import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-first-cnx',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './first-cnx.component.html',
  styleUrl: './first-cnx.component.css'
})
export class FirstCnxComponent {
  constructor(private router: Router) { }

  clientControl = new FormControl('', [Validators.required]);
  newPasswordControl = new FormControl('', [Validators.required]);

  onSubmit() {
    const codeClient = this.clientControl.value;
    const newPassword = this.newPasswordControl.value;

    const data = { codeClient, newPassword }; // correspondance avec les clés du backend
    const url = 'https://localhost:8080/auth/change-password';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          this.router.navigate(['/login']); // Redirection vers la page de connexion
        } else {
          throw new Error('Failed to change password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
