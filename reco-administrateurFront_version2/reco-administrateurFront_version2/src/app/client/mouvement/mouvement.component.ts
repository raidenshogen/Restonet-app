import {Component, ElementRef} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MouvementService} from "../../services/mouvement.service";

@Component({
  selector: 'app-mouvement',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        DatePipe
    ],
  templateUrl: './mouvement.component.html',
  styleUrl: './mouvement.component.css'
})
export class MouvementComponent {
  mouvements: any[] = [];

  constructor(private elementRef: ElementRef, private mouvementService: MouvementService) {
  }
  ngOnInit() {
    this.fetchVentes();
  }

  fetchVentes() {
    this.mouvementService.getVentesForCurrentUser().subscribe(
      (response) => {
        this.mouvements = response;
      },
      (error) => {
        console.error('Error:', error);
        if (typeof alert !== 'undefined') {
          alert('Une erreur s\'est produite lors du chargement de l\'historique des mouvements.');
        } else {
          console.error('Une erreur s\'est produite lors du chargement de l\'historique des mouvements.');
        }
      }
    );
  }
  toggleDetails(index: number) {
    this.mouvements[index].showDetails = !this.mouvements[index].showDetails;
  }


  scrollToTop() {
    window.scrollTo(0, 0);
  }
  

  scrollToBottom() {
    const bottomElement = this.elementRef.nativeElement.querySelector('.bottom-element');
    if (bottomElement) {
      bottomElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }
}
