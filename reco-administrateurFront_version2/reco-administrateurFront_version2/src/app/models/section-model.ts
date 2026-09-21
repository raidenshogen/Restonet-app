import { Repasreservation } from "./repasreservation";

export class SectionModel {
  section?: string;
  designation?: string;
  gestionreservations?: string;
  codeservice?: string;
  repas: Repasreservation[] = [];
}
