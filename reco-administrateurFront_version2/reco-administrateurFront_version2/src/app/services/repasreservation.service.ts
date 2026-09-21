import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Repasreservation} from "../models/repasreservation";
import {SectionModel} from "../models/section-model";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RepasreservationService {
  getAllArticles() {
    throw new Error('Method not implemented.');
  }
  host :string ="https://localhost:8080/api";

  repas:Repasreservation[];
  repa!:Repasreservation;

  sections:SectionModel[];
  section!:SectionModel;
  // services:ServiceModel[];
  
  constructor(private http:HttpClient) {
    this.sections=[];
    this.repas=[];
    //this.services=[];
  }

  getAllSection(){
    // return this.http.get<SectionModel[]>(this.host+"/getSections",httpOptions);
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return this.http.get<Array<SectionModel>>(`${this.host}/getSections`);
    }

    const token = localStorage.getItem('jwtToken');

    return this.http.get<Array<SectionModel>>(`${this.host}/getSections`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getSectionById(section:SectionModel){
    return this.http.get(`${this.host}/getSectionById?section=${section}`);
  }

  getAllRepasaReservation(){
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not supported in this environment');
      return this.http.get<Array<Repasreservation>>(`${this.host}/getRepas`);
    }

    const token = localStorage.getItem('jwtToken');

    //return this.http.get<Repasreservation[]>(this.host+"/getRepas",httpOptions);
    return this.http.get<Array<Repasreservation>>(`${this.host}/getRepas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

 getRepasById(id: number): Observable<Repasreservation> {
  const token = localStorage.getItem('jwtToken');
  return this.http.get<Repasreservation>(`${this.host}/getRepasById?repasareservation=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  getRepasBySection(section: string): Observable<Repasreservation[]> {
    const token = localStorage.getItem('jwtToken');
    
    return this.http.get<Repasreservation[]>(`${this.host}/getRepasBySection?section=${section}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((repas) => {
        console.log('🔍 Repas récupérés pour section', section, ':', repas);
      }),
      catchError(error => {
        console.error('❌ Erreur service getRepasBySection:', error);
        
        // Retourner un tableau vide en cas d'erreur
        return of([]);
      })
    );
  }

//iciii
  isRepasReserved(repasId: number | undefined, clientId: number): Observable<boolean> {
    const token = localStorage.getItem('jwtToken');

    return this.http.get<boolean>(`https://localhost:8080/api/reservations/reservé?repasId=${repasId}&clientId=${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  createReservation(repasId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    return this.http.post(`${this.host}/reservations`, { repasId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /*getAllServices(){
    return this.http.get<Array<ServiceModel>>(`${this.host}/getServices`);
  }

  getServiceById(serviceId:number){
    return this.http.get(`${this.host}/getServiceById?serviceId=${serviceId}`);
  }*/

}
