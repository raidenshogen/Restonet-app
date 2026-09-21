import {Component, OnInit} from '@angular/core';
//import {DetailRepasAReservation} from "../../models/detail-repas-areservation";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailRepasAReservationService} from "../../services/detail-repas-areservation.service";
import {RepasreservationService} from "../../services/repasreservation.service";
import { HttpClient } from '@angular/common/http';
import {Repasreservation} from "../../models/repasreservation";
import {from} from "rxjs";
import {ReservationService} from "../../services/reservation.service";
import {RepasDataService} from '../../services/repas-data.service'; 
import { CurrentUserService } from '../../services/current-user.service';
import { ClientModel } from '../../models/client.model';
import { MouvementService } from '../../services/mouvement.service';
import {Vente} from '../../models/vente.model';
import { ModeReglement } from '../../models/mode-reglement.model';
@Component({
  selector: 'app-detail-repas-client',
  templateUrl: './detail-repas-client.component.html',
  styleUrl: './detail-repas-client.component.css'
})
export class DetailRepasClientComponent implements OnInit {

  details: any[] = [];
  repasReservation!: Repasreservation;
  repasId!: number; // Add this property

  constructor(
    private route: ActivatedRoute,
    private detailRepasAReservationService: DetailRepasAReservationService,
    private repasReservationService: RepasreservationService,
    private reservationService: ReservationService,
    private router: Router,
    private repasDataService: RepasDataService,
    private currentUserService: CurrentUserService,
    private mouvementService: MouvementService // ✅ ADD THIS
  ) { }

  ngOnInit(): void {
    // FIX: Proper conversion and validation
    const idParam = this.route.snapshot.params['id'];
    this.repasId = parseInt(idParam, 10);
    
    if (isNaN(this.repasId)) {
      console.error('Invalid repas ID:', idParam);
      alert('ID de repas invalide');
      this.router.navigate(['/client/reservation-repas-client']);
      return;
    }

    console.log('Repas ID:', this.repasId);

    const selectedRepas = this.repasDataService.getSelectedRepas();
    if (selectedRepas) {
      this.repasReservation = selectedRepas;
    } else {
      this.repasReservation = {} as Repasreservation;
    }
    
    this.fetchDetails();
    // this.getResrvationInfo();
  }

  // FIX: Updated method with proper error handling
  fetchDetails(): void {
    console.log('🔍 Fetching details for repas ID:', this.repasId);
    
    this.detailRepasAReservationService.getDetailsByRepasReservation(this.repasId)
      .subscribe({
        next: (response) => {
          console.log('✅ Raw API response:', response);
          this.details = response || [];
          
          // FIX: Initialize with correct property names
          this.details.forEach(detail => {
            detail.quantity = detail.quantity || 0;
            const prix = detail.prixventeatva1||0 ; // Use DTO property name
            detail.total = detail.quantity * prix;
            
            console.log('Detail processed:', {
              libelle: detail.libellearticle, // Use DTO property name
              prix: prix,
              quantity: detail.quantity,
              total: detail.total
            });
          });
          
          console.log('✅ Processed details:', this.details);
        },
        error: (error) => {
          console.error('❌ Error loading details:', error);
          this.details = [];
        }
      });
  }

  updateTotal(detail: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    const quantity = parseFloat(target.value) || 0;
    detail.quantity = quantity;
    
    // FIX: Use the correct property name from your DTO
    const prix = detail.prixventeatva1 || 0; // Changed from detail.article?.PRIXVENTEATVA1
    detail.total = quantity * prix;
    
    console.log(`Updated detail: ${detail.libellearticle}, quantity=${quantity}, prix=${prix}, total=${detail.total}`);
  }

  // getResrvationInfo(): void {
  //   console.log('🔍 Fetching repas info for ID:', this.repasId);
    
  //   this.repasReservationService.getRepasById(this.repasId).subscribe({
  //     next: (repasReservation: Repasreservation) => {
  //       this.repasReservation = repasReservation;
  //       console.log('✅ Loaded repasReservation:', repasReservation);
  //     },
  //     error: (err) => {
  //       console.error('❌ Failed to load repasReservation', err);
  //       alert('Erreur lors du chargement des informations du repas.');
  //     }
  //   });
  // }
 
  calculateTotal(): number {
    return this.details.reduce((sum, detail) => sum + (detail.total || 0), 0);
  }

 reserveRepas(): void {
  const id = this.repasId;

  const token = localStorage.getItem('jwtToken');
  if (!token) {
    alert('Session expirée. Veuillez vous reconnecter.');
    this.router.navigate(['/login']);
    return;
  }

  const clientInfo = this.currentUserService.getCurrentUser();
  if (!clientInfo || !clientInfo.client) {
    alert('Informations client manquantes. Veuillez vous reconnecter.');
    this.router.navigate(['/login']);
    return;
  }

  const validDetails = this.details.filter(detail => detail.quantity > 0);
  if (validDetails.length === 0) {
    alert('Veuillez sélectionner au moins un article avec une quantité > 0.');
    return;
  }

  const nombreRepas = validDetails.length;

  // Step 1: Get vente count for current user for numeroticket
  this.mouvementService.getVentesForCurrentUser().subscribe({
    next: (ventes) => {
     

      // Step 2: Generate facture number
      const factureNumber = this.generateFactureNumberFromStorage(clientInfo.client? clientInfo.client : 'unknown');
      // Step 2: Build the reservation payload
      const reservation = {
        client: clientInfo.client,
        nom: clientInfo.nom || 'Inconnu',
        societe: clientInfo.societe || 'Inconnue',
        unite: clientInfo.unite || 'Inconnue',
        categorieClient: clientInfo.categorieclient || 'Client',
        modeSaisie: 'WEB',
        dateSaisie: new Date().toISOString().split('T')[0],
        heureSaisie: new Date().toTimeString().split(' ')[0].substring(0, 5),
        modeValidation: 'AUTO',
        etatReservation: 'CONFIRMED',
        codeService: this.repasReservation.codeservice,
        facture: factureNumber,
        operateur: 'SYSTEM',
        nombreRepas: nombreRepas,
        repasReservationId: id,
        detailReservations: validDetails.map(detail => ({
          codeArticle: detail.codeArticle,
          quantite: detail.quantity
        }))
      };
      const token = localStorage.getItem('jwtToken');
        if (!token) {
          alert('Session expirée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
          return;
        }
      // Step 3: Create reservation
      this.reservationService.createReservation(reservation).subscribe({
        next: (reservationResponse) => {
          console.log('✅ Reservation successful:', reservationResponse);

          // Step 4: Build Vente DTO for mouvement creation
          // const ventePayload: Vente = {
          //   numeroticket: numeroticket,
          //   section: this.repasReservation.section,
          //   repasdeservice: this.repasReservation.designation,
          //    dateoperation: reservation.dateSaisie,
          //    heure: reservation.heureSaisie,
          //   typeoperation: 'Reservation',
          //   nombrerepas: reservation.nombreRepas,
          //   montantpaye: this.calculateTotal(),
          //   modereglement: 'CB',
          //   anciensolde: clientInfo.anciensolde || 0,
          //   nouveausolde: (clientInfo.anciensolde ?? 0) > this.calculateTotal() ? ((clientInfo.anciensolde ?? 0) - this.calculateTotal()) : 0,
          //   // ✅ Send minimal Client entity
          //   client: clientInfo,
          // };
                 const numeroticket = this.generateTicketNumberFromStorage(clientInfo.client ? clientInfo.client : 'unknown');

          
                 // ✅ Update ventePayload to match simplified DTO
                 const  modeReglement:ModeReglement= {reglement:"CARD",designation:"Credit Card"}
          const ventePayload = {
            numeroticket: numeroticket,
            client: clientInfo,                     // Send full client object
            section: this.repasReservation.section, // Pass the full SectionModel object
            repasdeservice: this.repasReservation.designation,
            dateoperation: reservation.dateSaisie,
            heure: reservation.heureSaisie,
            typeoperation: 'RESERVATION',           // Fixed typo
            nombrerepas: reservation.nombreRepas,
            montantpaye: this.calculateTotal(),
            modereglement:modeReglement   ,     // Send as string
            anciensolde: clientInfo.anciensolde ||  0,
            nouveausolde: ( clientInfo.nouveausolde ||  0) - this.calculateTotal()
          };

          // Step 5: Create mouvement (vente record)
          this.mouvementService.createMovement(ventePayload).subscribe({
            next: (ventesResponse) => {
              console.log('✅ Mouvement Created:', ventesResponse);
              alert(`Réservation & Mouvement créés avec succès. Ticket: ${numeroticket}`);
              this.router.navigate(['/client/reservation-repas-client']);
            },
            error: (err) => {
              console.error('❌ Mouvement creation failed:', err);
              alert('Réservation réussie mais erreur lors de la création du mouvement.');
            }
          });
        },
        error: (err) => {
          console.error('❌ Reservation failed:', err);
          alert('Erreur lors de la réservation.');
        }
      });
    },
    error: (err) => {
      console.error('❌ Failed to get vente count:', err);
      alert('Erreur lors de la génération du numéro de ticket.');
    }
  });
}

// Helper method to get price (if not already exists)
private getPrice(detail: any): number {
  if (detail.prixventeatva1) {
    return detail.prixventeatva1;
  } else if (detail.article?.PRIXVENTEATVA1) {
    return detail.article.PRIXVENTEATVA1;
  }
  return 0;
}

// ✅ REPLACE: The old backend method with localStorage method
private generateFactureNumberFromStorage(clientId: string): string {
  const storageKey = `facture_count_${clientId}`;
  let count = parseInt(localStorage.getItem(storageKey) || '0', 10);
  count++;
  localStorage.setItem(storageKey, count.toString());
  
  return `FAC${count.toString().padStart(3, '0')}`;
}

private generateTicketNumberFromStorage(clientId: string): string {
  const storageKey = `ticket_count_${clientId}`;
  let count = parseInt(localStorage.getItem(storageKey) || '0', 10);
  count++;
  console.log(`Generating ticket number for client ${clientId}: count=${count}`);
  localStorage.setItem(storageKey, count.toString());
  
  return `TICK${count.toString().padStart(3, '0')}`;
}

// ✅ DELETE: Remove the old backend method
// private generateFactureNumber(clientId: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     this.reservationService.getFactureCountByClient(clientId).subscribe({
//       // This method is not working - DELETE IT
//     });
//   });
// }
}





