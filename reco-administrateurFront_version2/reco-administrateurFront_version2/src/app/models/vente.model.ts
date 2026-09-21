import { ClientModel } from "./client.model";
import { ModeReglement } from "./mode-reglement.model";
import { SectionModel } from "./section-model";

export class Vente {
    numeroticket?: string;
    dateoperation?: string;
    typeoperation?: string; 
    heure?: string;
    section?: SectionModel; 
    passage?: number; 
    client?: ClientModel; 
    montantpaye?: number;
    anciensolde?: number;
    nouveausolde?: number;
    modereglement?: ModeReglement;
    approvisionnement?: number;
    repasdeservice?: string; 
    nombrerepas?: number;

}
