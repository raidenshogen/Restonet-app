import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  getCurrentUser(): ClientModel | null {
    // ✅ Check if we're in browser environment
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage is not supported in this environment');
      return null;
    }

    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  setCurrentUser(user: ClientModel): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  clearCurrentUser(): void {
    localStorage.removeItem('userData');
  }
}