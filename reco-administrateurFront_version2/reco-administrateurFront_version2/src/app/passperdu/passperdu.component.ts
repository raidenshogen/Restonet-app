import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

interface ResetResponse {
  message: string;
}

@Component({
  selector: 'app-passperdu',
  standalone: true,
  imports: [],
  templateUrl: './passperdu.component.html',
  styleUrl: './passperdu.component.css'
})
export class PassperduComponent implements AfterViewInit {

  message: string | null = null;
  messageType: 'success' | 'error' = 'success';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.attachButtonListeners();
    }
  }

  private idInput(): HTMLInputElement | null {
    return document.getElementById('idresto') as HTMLInputElement;
  }

  private emailInput(): HTMLInputElement | null {
    return document.getElementById('mailresto') as HTMLInputElement;
  }

 private attachButtonListeners(): void {
  const idInput = this.idInput();
  const emailInput = this.emailInput();

  if (!idInput || !emailInput) return;

  // Get the forms
  const idForm = idInput.closest('form');
  const emailForm = emailInput.closest('form');

  // Prevent form submission
  [idForm, emailForm].forEach(form => {
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  });

  // Attach reset buttons
  const idButton = idInput.nextElementSibling as HTMLButtonElement;
  const emailButton = emailInput.nextElementSibling as HTMLButtonElement;

  idButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Stop form submit
    this.resetById();
  });

  emailButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Stop form submit
    this.resetByEmail();
  });
}

  resetById(): void {
    const input = this.idInput();
    const id = input?.value.trim();

    if (!id) {
      this.showMessage('Veuillez saisir un identifiant RestoNet.', 'error');
      return;
    }

    this.http.post<ResetResponse>('https://localhost:8080/ResetPassword/reset-password-by-id', { restoNetId: id })
      .subscribe({
        next: (res) => {
          this.showMessage(res.message, 'success');
          if (input) {
            input.value = '';
          }
        },
        error: () => {
          this.showMessage("Identifiant introuvable ou erreur réseau.", 'error');
        }
      });
  }

  resetByEmail(): void {
    const input = this.emailInput();
    const email = input?.value.trim();

    if (!email) {
      this.showMessage('Veuillez saisir une adresse email.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage('Adresse email invalide.', 'error');
      return;
    }

    this.http.post<ResetResponse>('https://localhost:8080/ResetPassword/reset-password-by-email', { email })
      .subscribe({
        next: (res) => {
          this.showMessage(res.message, 'success');
          if (input) {
            input.value = '';
          }
        },
        error: () => {
          this.showMessage("Email non trouvé ou erreur réseau.", 'error');
        }
      });
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = null, 5000);

    // Dynamically inject message below forms
    const forms = document.querySelectorAll('.password-form form');
    const lastForm = forms[forms.length - 1];
    const existing = document.querySelector('.dynamic-message');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = `alert alert-${type} dynamic-message mt-2`;
    el.innerHTML = `<strong>${msg}</strong>`;
    lastForm?.after(el);

    setTimeout(() => {
      const current = document.querySelector('.dynamic-message');
      if (current) current.remove();
    }, 5000);
  }
}