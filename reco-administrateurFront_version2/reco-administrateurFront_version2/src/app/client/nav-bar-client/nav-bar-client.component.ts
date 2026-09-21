import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Subscription} from "rxjs";
import {CurrentUserService} from "../../services/current-user.service";

@Component({
  selector: 'app-nav-bar-client',
  templateUrl: './nav-bar-client.component.html',
  styleUrl: './nav-bar-client.component.css'
})
export class NavBarClientComponent implements OnInit, OnDestroy {
  connectedClientName: string = '';
  client: any = {};
  private subscription: Subscription = new Subscription();

  // ✅ Simple search properties
  searchQuery: string = '';
  showSearchResults: boolean = false;
  
  // ✅ Simple list of client pages
  clientPages = [
    { name: 'Tableau de bord', path: '/client/dashboard', keywords: 'dashboard tableau bord accueil home' },
    { name: 'Réservation repas', path: '/client/ReservationRepasClientComponent', keywords: 'reservation repas meal booking reserve' },
    { name: 'Mon compte', path: '/client/infoscompte', keywords: 'compte profil info account profile information' },
    { name: 'Suggestions', path: '/client/suggestion', keywords: 'suggestion reclamation feedback complaint avis' },
    { name: 'Mouvement', path: '/client/mouvements', keywords: 'historique commande history order commandes mouvement movement' },
    { name: 'Approvisionner', path: '/client/approvisionner-client', keywords: 'approvisionner stock supply' }
  ];

  filteredPages: any[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private currentuser: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.loadClientData();
    this.loadConnectedClientName();
    
    // Subscribe to image updates
    this.subscription.add(
      this.clientService.imageUpdated.subscribe(() => {
        console.log('🔄 Image updated, refreshing navbar');
        this.loadClientData();
      })
    );

    // Subscribe to general data updates
    this.subscription.add(
      this.clientService.dataUpdated.subscribe(() => {
        console.log('🔄 Data updated, refreshing navbar');
        this.loadClientData();
        this.loadConnectedClientName();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ✅ Simple search function
  onSearchInput(event: any): void {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;
    
    if (query.length >= 2) {
      this.filteredPages = this.clientPages.filter(page => 
        page.name.toLowerCase().includes(query) || 
        page.keywords.toLowerCase().includes(query)
      );
      this.showSearchResults = this.filteredPages.length > 0;
    } else {
      this.showSearchResults = false;
    }
  }

  // ✅ Navigate to selected page
  navigateToPage(page: any): void {
    this.router.navigate([page.path]);
    this.searchQuery = '';
    this.showSearchResults = false;
  }

  // ✅ Clear search
  clearSearch(): void {
    this.searchQuery = '';
    this.showSearchResults = false;
  }

  loadClientData(): void {
    this.clientService.getClientInfo().subscribe(
      (response) => {
        this.client = response || {};
      },
      (error) => {
        console.error('Error loading client data in navbar:', error);
      }
    );
  }

  loadConnectedClientName(): void {
    const currentUser = this.currentuser.getCurrentUser();
    
    if (currentUser?.nom) {
      this.connectedClientName = currentUser.nom;
      console.log('✅ Using cached client name:', this.connectedClientName);
    } else {
      console.log('📡 Loading client name from API...');
      
      this.clientService.getConnectedClientName().subscribe({
        next: (nom) => {
          this.connectedClientName = nom;
          console.log('✅ Loaded client name from API:', this.connectedClientName);
        },
        error: (error) => {
          console.error('❌ Error loading client name from API:', error);
          this.connectedClientName = 'Invité';
        }
      });
    }
  }

  getClientImageUrl(): string {
    if (this.client?.imageUrl) {
      return `https://localhost:8080${this.client.imageUrl}`;
    } else {
       return '../assets/img/logos/admin.png';
    }
  }

  logout(): void {
    this.clientService.clearCache();
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
