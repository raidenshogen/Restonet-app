import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService { 
   private baseUrl = 'https://localhost:8080';

  // Add cache for client data
  private clientDataCache$ = new BehaviorSubject<any>(null);

  // Add event emitter for image updates
  private imageUpdatedSubject = new Subject<void>();
  
  // Add event emitter for general data updates
  private dataUpdatedSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getInfosForCurrentUser(): Observable<any> {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return of(null);
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found');
      return of(null);
    }

    return this.http.get(`${this.baseUrl}/infosCompte`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getConnectedClientName(): Observable<string> {
    return this.getInfosForCurrentUser().pipe(
      map(user => {
        if (!user || !user.nom || !user.prenom) {
          return 'Utilisateur'; // Fallback name
        }
        return `${user.nom} ${user.prenom}`;
      })
    );
  }
  changeEmail(newEmail: string): Observable<any> {
    // Check if we're in browser environment before accessing localStorage
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      })
    };

    return this.http.put<any>(`${this.baseUrl}/clients/changeEmail`, newEmail, httpOptions).pipe(
      tap(() => {
        // Clear cache after email change so next call fetches fresh data
        console.log('🔄 Clearing cache after email change');
        this.clientDataCache$.next(null);
        // Notify all components that data has been updated
        this.dataUpdatedSubject.next();
      })
    );
  }
  changePassword(codeClient: string, newPassword: string): Observable<any> {
    // Check if we're in browser environment before accessing localStorage
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      })
    };

    const requestBody = {
      codeClient: codeClient,
      newPassword: newPassword
    };

    return this.http.post<any>(`${this.baseUrl}/auth/change-password`, requestBody, httpOptions).pipe(
      tap(() => {
        // Clear cache after password change
        console.log('🔄 Clearing cache after password change');
        this.clientDataCache$.next(null);
        // Notify all components that data has been updated
        this.dataUpdatedSubject.next();
      })
    );
  }
  getClientInfo(): Observable<any> {
    // Check if we have cached data
    if (this.clientDataCache$.value) {
      console.log('✅ Returning cached client data');
      return of(this.clientDataCache$.value);
    }

    // Check if we're in browser environment before accessing localStorage
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return of(null);
    }

    // If no cache, fetch from API
    console.log('🔍 Fetching fresh client data from API');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      })
    };

    return this.http.get<any>(`${this.baseUrl}/clients/infosCompte`, httpOptions).pipe(
      tap(data => {
        // Save to cache
        console.log('💾 Caching client data for future use');
        this.clientDataCache$.next(data);
      })
    );
  }

  // Method to force refresh from API
  refreshClientInfo(): Observable<any> {
    console.log('🔄 Force refreshing client data');
    this.clientDataCache$.next(null); // Clear cache
    return this.getClientInfo();
  }

  // Method to clear cache (call this on logout)
  clearCache(): void {
    console.log('🗑️ Clearing client data cache');
    this.clientDataCache$.next(null);
  }

  // Method to notify components of data updates (useful for manual refresh)
  notifyDataUpdated(): void {
    console.log('📢 Manually notifying components of data update');
    this.dataUpdatedSubject.next();
  }

  // Observable for components to subscribe to
  get imageUpdated(): Observable<void> {
    return this.imageUpdatedSubject.asObservable();
  }

  // Observable for components to subscribe to data updates
  get dataUpdated(): Observable<void> {
    return this.dataUpdatedSubject.asObservable();
  }

  changeClientImage(file: File): Observable<any> {
    // Check if we're in browser environment before accessing localStorage
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return of(null);
    }

    const formData = new FormData();
    formData.append('image', file);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      })
    };

    return this.http.post<any>(`${this.baseUrl}/clients/changeImage`, formData, httpOptions).pipe(
      tap(() => {
        // Clear cache and notify components
        console.log('🔄 Clearing cache after image change');
        this.clientDataCache$.next(null);
        this.imageUpdatedSubject.next(); // Notify navbar to refresh
        this.dataUpdatedSubject.next(); // Notify all components that data has been updated
      })
    );
  }

  // ADD THIS METHOD
  changeImageUrl(imageUrl: string): Observable<any> {
    // Check if we're in browser environment before accessing localStorage
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      })
    };

    console.log('🔄 Sending image URL to backend:', imageUrl);
    
    return this.http.put<any>(`${this.baseUrl}/clients/changeImage`, `"${imageUrl}"`, httpOptions).pipe(
      tap(() => {
        // Clear cache after image change
        console.log('🔄 Clearing cache after image change');
        this.clientDataCache$.next(null);
        
        // Notify navbar to refresh
        this.imageUpdatedSubject.next();
        this.dataUpdatedSubject.next(); // Notify all components that data has been updated
      })
    );
  }
  provisionAccount(email: string, amount: number): Observable<any> {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported');
      return of(null);
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const payload = { email, amount };

    return this.http.post(`${this.baseUrl}/clients/provision`, payload, httpOptions).pipe(
      tap(() => {
        // Clear cache after update to force refresh
        this.clientDataCache$.next(null);
        this.dataUpdatedSubject.next(); // Notify components to refresh
      })
    );
  }
}
