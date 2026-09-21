import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reservation} from "../models/reservation";
import {DetailReservation} from "../models/detail-reservation";
import {Console} from "node:inspector";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'https://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

  /*createReservation(reservation: Reservation): Observable<Reservation> {
    const token = localStorage.getItem('jwtToken');
    return this.http.post<Reservation>(this.apiUrl, reservation, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }*/
  createReservation(reservation: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    return this.http.post<any>(this.apiUrl, reservation, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Add this method to get facture count for a client
  getFactureCountByClient(clientId: string): Observable<number> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.get<number>(
      `${this.apiUrl}/facture-count/${clientId}`,
      { headers }
    );
  }
}
