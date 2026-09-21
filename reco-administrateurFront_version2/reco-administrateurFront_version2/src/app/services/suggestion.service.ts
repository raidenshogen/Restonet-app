import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion.model';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  baseUrl = 'https://localhost:8080/suggestion';
  constructor(private http: HttpClient) { }

  

getSuggestions(client: string): Observable<Suggestion[]> {
   const token= localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return this.http.get<Suggestion[]>(`${this.baseUrl}/user-suggestions?client=${client}`,{headers});
  }
  createSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    const token= localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return this.http.post<Suggestion>(`${this.baseUrl}/create`, suggestion, { headers });
  }
  getSuggestionCountByClient(clientId: string): Observable<string> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.get<string>(`${this.baseUrl}/suggestion-count/${clientId}`, { headers });
  }
}