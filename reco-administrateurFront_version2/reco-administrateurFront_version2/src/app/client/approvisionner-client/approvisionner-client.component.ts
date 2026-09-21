import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approvisionner-client',
  templateUrl: './approvisionner-client.component.html',
  styleUrls: ['./approvisionner-client.component.css']
})
export class ApprovisionnerClientComponent implements OnInit {

  value = 30;
  Isaccepted = false;
  showTermsModal = false;
  
  constructor() {
    this.Isaccepted = false;
    this.value = 30;
    console.log('🔍 ApprovisionnerClient component initialized');
  }
  
  ngOnInit(): void {
    console.log('Component loaded, waiting for user interaction');
  }

  // Show terms modal
  showTerms(): void {
    this.showTermsModal = true;
  }

  // Accept terms
  acceptTerms(): void {
    this.Isaccepted = true;
    this.showTermsModal = false;
    alert('Merci d\'avoir accepté les conditions générales d\'utilisation de RestoNet.');
  }

  // Decline terms
  declineTerms(): void {
    this.Isaccepted = false;
    this.showTermsModal = false;
  }
  
}
