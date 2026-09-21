import {Component, OnInit} from '@angular/core';
//import { Repasreservation } from "../../models/repasreservation.model";
//import {SectionModel} from "../../models/section.model";
import {RepasreservationService} from "../../services/repasreservation.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
//import {ServiceModel} from "../../models/service.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {Repasreservation} from "../../models/repasreservation";
import {SectionModel} from "../../models/section-model";
import {catchError, map, Observable, of} from "rxjs";
import {Reservation} from "../../models/reservation";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepasDataService} from '../../services/repas-data.service';
@Component({
  selector: 'app-reservation-repas-client',
  templateUrl: './reservation-repas-client.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./reservation-repas-client.component.css']
})
export class ReservationRepasClientComponent implements OnInit{

  selectedSection: string = '';
  selectedService: string = '';

  repas! :Array<Repasreservation>
  sections :Array<SectionModel> = []
  //services! : Array<ServiceModel>
  //filteredServices: ServiceModel[] = [];
  filteredRepas: Repasreservation[]=[];
  weeks: { startDate: Date, endDate: Date, meals: Repasreservation[] }[] = [];

  constructor( private repasreservationService: RepasreservationService,
   private repasDataService: RepasDataService,
  private router: Router,
  private route: ActivatedRoute,
  private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    
    this.getAllSection()
    this.getAllRepasaReservation()
    // this.getAllServices()
    // this.fetchDefaultRepas();
    //  this.fetchRepasBySection(this.selectedSection);
    
  }

calculateWeeks(): void {
  const currentDate = new Date('2025-08-01'); // Hardcoded future date
  const currentDay = currentDate.getDay();
  this.weeks = [];

  for (let i = 0; i < 6; i++) {
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - currentDay + 1 + i * 7);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const mealsForWeek = this.filteredRepas.filter(repas => {
      if (repas.daterepas) {
        const repasDate = new Date(repas.daterepas);
        return repasDate >= startDate && repasDate <= endDate;
      }
      return false;
    });

    this.weeks.push({ startDate, endDate, meals: mealsForWeek });
  }
}
  getDaysOfWeek(startDate: Date): Date[] {
    const daysOfWeek: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      daysOfWeek.push(date);
    }
    return daysOfWeek;
  }
 // Get all repas for a specific day (not just one)
getAllRepasOnDay(day: Date): Repasreservation[] {
  const dayStr = day.toDateString();
  
  return this.filteredRepas.filter(repas => {
    if (repas.daterepas) {
      const repasDate = new Date(repas.daterepas);
      return repasDate.toDateString() === dayStr;
    }
    return false;
  });
}

// Updated method to check if there are any repas on a day
hasRepasOnDay(day: Date): boolean {
  return this.getAllRepasOnDay(day).length > 0;
}

// ✅ NEW METHOD: Set all repas for a day in the service
setAllRepasForDay(day: Date): void {
  const repasOnDay = this.getAllRepasOnDay(day);
  if (repasOnDay.length > 0) {
    // Store all repas for the day
    this.repasDataService.setSelectedRepasArray(repasOnDay);
  }
}

// ✅ UPDATE: Modified to handle multiple repas
getRepasIdOnDay(day: Date, week: any): number | undefined {
  const repasOnDay = this.getAllRepasOnDay(day);
  
  if (repasOnDay.length > 0) {
    // Set all repas for this day
    this.setAllRepasForDay(day);
    // Return the first repas ID (for routing purposes)
    return repasOnDay[0].repasareservation;
  }
  
  return undefined;
}
  
  fetchRepasBySection(section: string): void {
  console.log('Fetching repas for section:', section);
  this.selectedSection = section;

  this.repasreservationService.getRepasBySection(section)
    .subscribe({
      next: (repas: Repasreservation[]) => {
        this.filteredRepas = repas;
        console.log('✅ Repas loaded:', this.filteredRepas);

        // Recalculate weeks AFTER data arrives
        this.weeks = [];
        this.calculateWeeks();
        console.log('✅ Weeks recalculated:', this.weeks);
      },
      error: (err) => {
        console.error('❌ Error loading repas', err);
      }
    });
}

// Add this fallback method
// filterRepasFromAllData(section: string): void {
//   console.log('🔄 Fallback: Filtering from all repas data');
  
//   if (this.repas && this.repas.length > 0) {
//     this.filteredRepas = this.repas.filter(repas => {
//       const matches = repas.section === section;
//       console.log(`Repas ${repas.repasareservation}: section=${repas.section}, matches=${matches}`);
//       return matches;
//     });
    
//     console.log('✅ Fallback filtered repas:', this.filteredRepas);
//     this.weeks = [];
//     this.calculateWeeks();
//   } else {
//     console.warn('⚠️ No repas data available for filtering');
//   }
// }

  getAllSection() {
  this.repasreservationService.getAllSection().subscribe({
    next: (data) => {
      this.sections = data;
      console.log('Sections loaded:', this.sections);

      // Fix: Look for 'O' instead of 'Yes' based on your database
      const validSection = data.find(s => s.gestionreservations === 'Yes' || s.gestionreservations === 'yes');

      if (validSection && validSection.section) {
        this.selectedSection = validSection.section;
        console.log('Selected section:', this.selectedSection);
        this.fetchRepasBySection(this.selectedSection);
      } else {
        console.warn('No section with gestionreservations = O found');
        // Fallback: try to select the first available section
       
      }
    },
    error: (error) => {
      console.error('Error loading sections', error);
    }
  });
}

  getAllRepasaReservation(){
    this.repasreservationService.getAllRepasaReservation().subscribe({
      next:(data)=>{
        this.repas=data;
        //this.repas = this.getMealsForCurrentWeek(this.repas);
      },
      error: (error: any) => {
        console.error('Error fetching repasreservation:', error);
      }
    })
  }

//iciiii
  /*isRepasReserved(repasId: number): Observable<boolean> {
    //const clientId = localStorage.getItem('clientId');
    const clientInfo = JSON.parse(localStorage.getItem('userData')!);
    const clientId= clientInfo.client;
    return this.repasreservationService.isRepasReserved(repasId, clientId);
  }*/


 }