import { NgModule } from '@angular/core';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NavBarAdminComponent } from './admin/nav-bar-admin/nav-bar-admin.component';

import { ParametresGenerauxAdminComponent } from './admin/parametres-generaux-admin/parametres-generaux-admin.component';
import { ParametrageAccesAdminComponent } from './admin/parametrage-acces-admin/parametrage-acces-admin.component';
import { ParametrageInterfaceAdminComponent } from './admin/parametrage-interface-admin/parametrage-interface-admin.component';
import { PageNotfndAdminComponent } from './admin/page-notfnd-admin/page-notfnd-admin.component';
import { FooterAdminComponent } from './admin/footer-admin/footer-admin.component';
import { ReservationAdminComponent } from './admin/reservation-admin/reservation-admin.component';
import { AdministrationAdminComponent } from './admin/administration-admin/administration-admin.component';
import { ApprovisionnementAdminComponent } from './admin/approvisionnement-admin/approvisionnement-admin.component';
import { BdParaAdminComponent } from './admin/bd-para-admin/bd-para-admin.component';
import { BdTestAdminComponent } from './admin/bd-test-admin/bd-test-admin.component';
import { TestEnvoiMailAdminComponent } from './admin/test-envoi-mail-admin/test-envoi-mail-admin.component';
import {NavBarClientComponent} from "./client/nav-bar-client/nav-bar-client.component";
import {ApprovisionnerClientComponent} from "./client/approvisionner-client/approvisionner-client.component";
import { ReservationRepasClientComponent } from './client/reservation-repas-client/reservation-repas-client.component';
import {DetailRepasClientComponent} from "./client/detail-repas-client/detail-repas-client.component";
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';
import {CommonModule} from "@angular/common";
import {AuthComponent} from "./Authentification/login-Client/auth.component";
import {PassperduComponent} from "./passperdu/passperdu.component";
import {authAdminGuard} from "./guards/auth-admin.guard";
import {MouvementComponent} from "./client/mouvement/mouvement.component";
import {InfoCompteComponent} from "./client/info-compte/info-compte.component";
import {ForbiddenComponent} from "./client/forbidden/forbidden.component";
import {authClientGuard} from "./guards/auth-client.guard";
import {LoginAdministrateurComponent} from "./Authentification/login-administrateur/login-administrateur.component";
import {FirstCnxComponent} from "./client/first-cnx/first-cnx.component";
import {SuggestionComponent} from "./client/suggestion/suggestion.component";


let ClientSuggestionComponent;
const routes: Routes = [
  { path: 'login', component: AuthComponent},
  { path: 'loginadmin', component: LoginAdministrateurComponent},
  { path: 'passwordperdu', component: PassperduComponent },
  { path: 'changepassword', component: FirstCnxComponent },

  {path: 'admin',
    component: SideBarAdminComponent,
    children: [
      {path: "NavBarAdminComponent", component: NavBarAdminComponent},
      {path: "PageNotfndAdminComponent", component: PageNotfndAdminComponent},
      {path: "ParametresGenerauxAdminComponent", component: ParametresGenerauxAdminComponent},
      {path: "ParametrageAccesAdminComponent", component: ParametrageAccesAdminComponent},
      {path: "ParametrageInterfaceAdminComponent", component: ParametrageInterfaceAdminComponent},
     // {path: "ReservationAdminComponent", component: ReservationAdminComponent, canActivate: [authAdminGuard]},
     // {path: "ApprovisionnementAdminComponent", component: ApprovisionnementAdminComponent, canActivate: [authAdminGuard] },
      {path: "ReservationAdminComponent", component: ReservationAdminComponent},
      {path: "ApprovisionnementAdminComponent", component: ApprovisionnementAdminComponent},
      {path: "AdministrationAdminComponent", component: AdministrationAdminComponent},
      {path: "BdParaAdminComponent", component: BdParaAdminComponent},
      {path: "BdTestAdminComponent", component: BdTestAdminComponent},
      {path: "TestEnvoiMailAdminComponent", component: TestEnvoiMailAdminComponent},
      {path: "FooterAdminComponent", component: FooterAdminComponent},
    ]},

  {
    path : 'client' ,
    component : SidebarClientComponent ,
    children : [
      {path : "NavBarClientComponent" , component : NavBarClientComponent },
      {path : "ApprovisionnerClientComponent" , component: ApprovisionnerClientComponent},
      {path : "ReservationRepasClientComponent" , component: ReservationRepasClientComponent},
      {path : "DetailRepasClientComponent/:id" , component: DetailRepasClientComponent},
      { path: 'infoscompte', component: InfoCompteComponent },
     // { path: 'mouvements', component: MouvementComponent  , canActivate : [authClientGuard]},
      { path: 'mouvements', component: MouvementComponent},
      { path: 'suggestion', component: SuggestionComponent},
      { path: 'forbidden', component: ForbiddenComponent},
      { path: '', redirectTo: 'ApprovisionnerClientComponent', pathMatch: 'full' }
    ]},


  //{path : "" ,redirectTo:"/login", pathMatch:"full" }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
