import { DetailRepasAReservation } from "./detail-repas-areservation";

export class Article {
  article?: string;
  libelleCourt?: string;
  nom?: string;
  famille?: string;
  prixventeAtva1?: string;
  prixVenteAtva2?: string;
  prixVenteAtva3?: string;
  repasDetail:Array<DetailRepasAReservation>= [];
}
