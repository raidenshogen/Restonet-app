import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import { Vente } from "../models/vente.model"

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  private baseUrl = 'https://localhost:8080/ventes';

  constructor(private http: HttpClient) {}

  getVentesForCurrentUser(): Observable<Vente[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Vente[]>(`${this.baseUrl}/user`, { headers });
  }
createMovement(mouvementDto: Vente): Observable<Vente> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Vente>(`${this.baseUrl}/mouvements`, mouvementDto, { headers });
  }
 getTicketCountByClient(clientId: string): Observable<string> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<string>(`${this.baseUrl}/ticket-count/${clientId}`, { headers });
}
}