import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TexteAccueilService {
  restonetText = ` RestoNet permet de :
  - Consulter l'état de votre compte
  - Consulter l'historique de vos consommations
  - Approvisionner votre compte par carte bancaire
  - Consulter les menus

  Pour avoir accès à ces fonctionnalités, vous devez préalablement vous identifier. 👋`;
  constructor() { }
}
