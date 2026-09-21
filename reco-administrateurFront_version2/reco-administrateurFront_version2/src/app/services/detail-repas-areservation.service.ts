import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailRepasAReservationService {

  private baseUrl = 'https://localhost:8080';

  constructor(private http: HttpClient) { }

  // FIX: Updated to match your backend endpoint
 getDetailsByRepasReservation(id: number): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  return this.http.get(`${this.baseUrl}/api/repasreservations/${id}/details`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}