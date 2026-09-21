import { Component, Inject } from '@angular/core';
import { Suggestion } from '../../models/suggestion.model';
import { SuggestionService } from '../../services/suggestion.service';
import { ClientModel } from '../../models/client.model';
import { OnInit } from '@angular/core';
import { RepasreservationService } from '../../services/repasreservation.service';
import { SectionModel } from '../../models/section-model';
import { CurrentUserService } from '../../services/current-user.service';
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css'
})
export class SuggestionComponent implements OnInit {
  showSuggForm: boolean = false;
  showPasswordForm: any;
  suggestion: Suggestion = {suggestion:'', email: '', section: { repas: [] }, messages: '', clientId: {} };
 sections: SectionModel[] = [];
 selectedSection: string = '';
  constructor(
    private suggestionService: SuggestionService,
    private repasReservtionService: RepasreservationService,
    @Inject(CurrentUserService) private currentuser: CurrentUserService
  ) {}
 

  ngOnInit(): void {
    this.loadSections();
  }

  OnInit() {
     this.loadSections();
  }
  loadSections() {
    this.repasReservtionService.getAllSection().subscribe({
      next: (data) => {
        this.sections = data; // Store the full SectionModel objects
      },
      error: (err) => {
        console.error('Failed to fetch sections', err);
      }
    });
  }
  toggleSuggForm() {
    this.showSuggForm = !this.showSuggForm;

  }
  

  submitSuggForm() {
    const selectedSectionObj = this.sections.find(section => section.designation === this.selectedSection);
    const currentUser = this.currentuser.getCurrentUser();
    if (!currentUser) {
      alert('Utilisateur non authentifié. Veuillez vous connecter.');
      return;
    }
    
    this.suggestionService.getSuggestionCountByClient(currentUser.client!).subscribe({
    next: (countStr) => {
      const currentCount = parseInt(countStr, 10) || 0;
      const newSuggestionNumber = `SUG${(currentCount + 1).toString().padStart(3, '0')}`;
      
      const suggestionPayload: Suggestion = {
        suggestion: newSuggestionNumber,
        email: this.suggestion.email,
        section: selectedSectionObj || this.suggestion.section,
        messages: this.suggestion.messages,
        clientId: currentUser
      };
      console.log('Generated suggestion number:', newSuggestionNumber);
      console.log('Sending payload:', suggestionPayload);
     this.suggestionService.createSuggestion(suggestionPayload).subscribe({
        next: (res) => {
          console.log('Suggestion created:', res);
          alert('Merci pour votre suggestion ! 🎉');
          this.showSuggForm = false;
        },
        error: (err) => {
          console.error('Error saving suggestion', err);
          if (err.status === 403) {
            alert('Accès refusé. Vérifiez vos permissions.');
          } else if (err.status === 401) {
            alert('Session expirée. Veuillez vous reconnecter.');
          }
        }
      });
    },
    error: (err) => {
      console.error('Error getting suggestion count', err);
      alert('Erreur lors de la génération du numéro de suggestion.');
    }
  });
}
  cancelSuggForm() {
     this.showSuggForm = false;
  }
  // private generateSuggestionNumberFromStorage(clientId: string): string {
  // const storageKey = `ticket_count_${clientId}`;
  // let count = parseInt(localStorage.getItem(storageKey) || '0', 10);
  // count++;
  // console.log(`Generating suggestion number for client ${clientId}: count=${count}`);
  // localStorage.setItem(storageKey, count.toString());
  
  // return `SUG${count.toString().padStart(3, '0')}`;
}
  
  

