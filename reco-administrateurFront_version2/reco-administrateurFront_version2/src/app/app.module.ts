import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarAdminComponent } from './admin/nav-bar-admin/nav-bar-admin.component';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
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
import { NavBarClientComponent } from "./client/nav-bar-client/nav-bar-client.component";
import { ApprovisionnerClientComponent } from './client/approvisionner-client/approvisionner-client.component';
import { FormsModule } from "@angular/forms";
import { DetailRepasClientComponent } from './client/detail-repas-client/detail-repas-client.component';
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ForbiddenComponent } from './client/forbidden/forbidden.component';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { SuggestionComponent } from './client/suggestion/suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarAdminComponent,
    SideBarAdminComponent,
    ParametresGenerauxAdminComponent,
    ParametrageInterfaceAdminComponent,
    PageNotfndAdminComponent,
    FooterAdminComponent,
    ReservationAdminComponent,
    AdministrationAdminComponent,
    ApprovisionnementAdminComponent,
    BdParaAdminComponent,
    BdTestAdminComponent,
    TestEnvoiMailAdminComponent,
    NavBarClientComponent,
    ApprovisionnerClientComponent,
    DetailRepasClientComponent,
    SidebarClientComponent,
    ForbiddenComponent,
    SuggestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
