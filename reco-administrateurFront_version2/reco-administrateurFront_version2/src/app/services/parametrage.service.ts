import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginConfiguration, ModeIdentification } from '../models/login-config.model';

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
  private apiUrl = '/api/parametrage';
  
  // ✅ Global login mode subject
  private currentLoginModeSubject = new BehaviorSubject<string>(ModeIdentification.MATRICULE);
  public currentLoginMode$ = this.currentLoginModeSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load current configuration on service init
    this.loadCurrentLoginMode();
  }

  // ✅ Load current login mode from backend or localStorage
  private loadCurrentLoginMode(): void {
    const savedMode = localStorage.getItem('loginMode');
    if (savedMode) {
      this.currentLoginModeSubject.next(savedMode);
    } else {
      // Fetch from backend - adapt to your existing API
      this.getParametrageAcces().subscribe({
        next: (config) => {
          if (config && config.modeIdentification) {
            this.updateGlobalLoginMode(config.modeIdentification);
          }
        },
        error: () => {
          // Use default mode
          this.updateGlobalLoginMode(ModeIdentification.MATRICULE);
        }
      });
    }
  }

  // ✅ Adapt to your existing backend API
  getParametrageAcces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/acces`);
  }

  saveParametrageAcces(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/acces`, data);
  }

  // ✅ Get login configuration (adapt to your backend structure)
  getLoginConfiguration(): Observable<LoginConfiguration> {
    return this.http.get<LoginConfiguration>(`${this.apiUrl}/login-config`);
  }

  // ✅ Save login configuration (adapt to your backend structure)
  saveLoginConfiguration(config: LoginConfiguration): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-config`, config);
  }

  // ✅ Update global login mode
  updateGlobalLoginMode(mode: string): void {
    this.currentLoginModeSubject.next(mode);
    localStorage.setItem('loginMode', mode);
    localStorage.setItem('loginModeUpdated', new Date().toISOString());
  }

  // ✅ Get current login mode
  getCurrentLoginMode(): string {
    return this.currentLoginModeSubject.value;
  }

  // ✅ Get label for login field based on current mode
  getLoginFieldLabel(): string {
    const mode = this.getCurrentLoginMode();
    
    switch (mode) {
      case ModeIdentification.EMAIL:
        return 'Adresse email';
      case ModeIdentification.MATRICULE:
        return 'Matricule';
      case ModeIdentification.BADGE:
        return 'Numéro de badge';
      case ModeIdentification.BADGE_VISIBLE:
        return 'Numéro de badge visible';
      case ModeIdentification.CODE_CLIENT:
        return 'Code client';
      default:
        return 'Identifiant';
    }
  }

  // ✅ Get validation pattern based on current mode
  getValidationPattern(): string | null {
    const mode = this.getCurrentLoginMode();
    
    switch (mode) {
      case ModeIdentification.EMAIL:
        return '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
      case ModeIdentification.MATRICULE:
        return '^[A-Za-z0-9]+$';
      case ModeIdentification.BADGE:
      case ModeIdentification.BADGE_VISIBLE:
        return '^[0-9]+$';
      default:
        return null;
    }
  }

  // ✅ Get input type based on current mode
  getInputType(): string {
    const mode = this.getCurrentLoginMode();
    
    switch (mode) {
      case ModeIdentification.EMAIL:
        return 'email';
      case ModeIdentification.BADGE:
      case ModeIdentification.BADGE_VISIBLE:
        return 'number';
      default:
        return 'text';
    }
  }

  // ✅ Get placeholder text
  getPlaceholderText(): string {
    const mode = this.getCurrentLoginMode();
    
    switch (mode) {
      case ModeIdentification.EMAIL:
        return 'exemple@email.com';
      case ModeIdentification.MATRICULE:
        return 'Votre matricule';
      case ModeIdentification.BADGE:
      case ModeIdentification.BADGE_VISIBLE:
        return 'Numéro de badge';
      case ModeIdentification.CODE_CLIENT:
        return 'Code client';
      default:
        return 'Identifiant';
    }
  }
}