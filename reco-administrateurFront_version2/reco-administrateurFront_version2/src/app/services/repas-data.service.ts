import { Injectable } from '@angular/core';
import { Repasreservation } from '../models/repasreservation';

@Injectable({
  providedIn: 'root'
})
export class RepasDataService {
  private selectedRepas: Repasreservation | null = null;
  private selectedRepasArray: Repasreservation[] = []; // ✅ ADD THIS

  setSelectedRepas(repas: Repasreservation): void {
    this.selectedRepas = repas;
    this.selectedRepasArray = [repas]; // Clear array when setting single repas
  }

  getSelectedRepas(): Repasreservation | null {
    return this.selectedRepas;
  }

  // ✅ ADD THESE NEW METHODS
  setSelectedRepasArray(repasArray: Repasreservation[]): void {
    this.selectedRepasArray = repasArray;
    // Set the first one as the main selected repas for backward compatibility
    this.selectedRepas = repasArray.length > 0 ? repasArray[0] : null;
  }

  getSelectedRepasArray(): Repasreservation[] {
    return this.selectedRepasArray;
  }

  clearSelection(): void {
    this.selectedRepas = null;
    this.selectedRepasArray = [];
  }
}
