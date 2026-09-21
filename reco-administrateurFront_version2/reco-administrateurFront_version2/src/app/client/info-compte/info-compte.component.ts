import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {HttpClient} from "@angular/common/http";
import { CurrentUserService } from '../../services/current-user.service';
@Component({
  selector: 'app-info-compte',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './info-compte.component.html',
  styleUrl: './info-compte.component.css'
})
export class InfoCompteComponent implements OnInit {
  showPasswordForm: boolean = false;
  newPassword = new FormControl('', [Validators.required]);
  newPassword1 = new FormControl('', [Validators.required]);
  newEmail = new FormControl('', [Validators.required, Validators.email]);

  // Use only ONE data source
  client: any = {};
  loading = false;
  selectedFile: File | null = null; // ADD THIS

  constructor(
    private clientService: ClientService,
    private http: HttpClient
    , private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    console.log('🔍 InfoCompte component initialized');
    this.loadClientFromDatabase();
  }

  loadClientFromDatabase(): void {
    this.loading = true;

    this.clientService.getClientInfo().subscribe(
      (response) => {
        console.log('✅ Client data received:', response);
        this.client = response || {};

        // Set email form control with the loaded email
        if (this.client.email) {
          this.newEmail.setValue(this.client.email);
        }
        if(response.client){
          this.currentUserService.setCurrentUser(this.client);
          console.log('🔄 Current user is saved:', this.currentUserService.getCurrentUser());
        }

        this.loading = false;
      },
      (error) => {
        console.error('❌ Error loading client info:', error);
        this.client = {};
        this.loading = false;
      }
    );
  }

  submitPasswordForm() {
    if (!this.newPassword.value || !this.newPassword1.value) {
      alert('Veuillez remplir tous les champs de mot de passe.');
      return;
    }

    if (this.newPassword.value !== this.newPassword1.value) {
      alert('Erreur: les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (!this.client?.client) {
      alert('Données client non chargées. Veuillez rafraîchir la page.');
      return;
    }

    console.log('🔐 Changing password using ClientService...');
    this.loading = true;

    // ✅ Use your existing ClientService method
    this.clientService.changePassword(this.client.client, this.newPassword.value).subscribe({
      next: (response) => {
        console.log('✅ Password changed successfully:', response);
        alert('Le mot de passe est changé avec succès');
        this.showPasswordForm = false;
        
        // Clear password fields
        this.newPassword.setValue('');
        this.newPassword1.setValue('');
        
        this.loading = false;
        
        // No need to manually call loadClientFromDatabase() 
        // because the service already clears cache and notifies components
      },
      error: (error) => {
        console.error('❌ Password change error:', error);
        this.loading = false;
        
        if (error.status === 404) {
          alert('Utilisateur non trouvé. Vérifiez votre identifiant client.');
        } else if (error.status === 401) {
          alert('Session expirée. Veuillez vous reconnecter.');
        } else if (error.status === 400) {
          alert('Données invalides. Vérifiez le format du mot de passe.');
        } else if (error.status === 0) {
          alert('Impossible de se connecter au serveur.');
        } else {
          const errorMessage = error.error?.message || error.message || 'Erreur inconnue';
          alert(`Erreur lors du changement de mot de passe: ${errorMessage}`);
        }
      }
    });
  }

  // ✅ Add separate error handling method
  private handlePasswordError(error: any): void {
    console.error('Full error object:', error);
    
    if (error.status === 401) {
      alert('Session expirée. Veuillez vous reconnecter.');
    } else if (error.status === 404) {
      alert('Endpoint non trouvé. Vérifiez la configuration du serveur.');
    } else if (error.status === 400) {
      alert('Données invalides. Vérifiez le format du mot de passe.');
    } else if (error.status === 0) {
      alert('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
    } else {
      const errorMessage = error.error?.message || error.message || 'Erreur inconnue';
      alert(`Erreur lors du changement de mot de passe: ${errorMessage}`);
    }
  }

  submitEmailForm(event: Event): void {
    event.preventDefault();

    if (this.newEmail.valid) {
      this.clientService.changeEmail(this.newEmail.value!).subscribe(
        (response) => {
          alert('Email changed successfully');
          // Refresh the data after email change
          this.loadClientFromDatabase();
        },
        (error) => {
          console.error('Error:', error);
          alert('Échec du changement d\'adresse e-mail.');
        }
      );
    } else {
      alert('Veuillez saisir une adresse e-mail valide.');
    }
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
  }


  cancelPasswordForm() {
    this.showPasswordForm = false;

  }

  // ADD THIS METHOD - triggered when image is clicked
  // onImageClick(): void {
  //   console.log('🖼️ Image clicked, opening file dialog');
  //   const fileInput = document.getElementById('imageFileInput') as HTMLInputElement;
  //   fileInput.click();
  // }

  // ADD THIS METHOD - triggered when file is selected

 /* onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('📁 File selected:', file.name);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner uniquement des fichiers image');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille du fichier ne doit pas dépasser 5MB');
        return;
      }

      this.selectedFile = file;
      this.uploadImageFile(); // Upload the actual file
    }
  }

  // ADD THIS METHOD - for actual file upload
  uploadImageFile(): void {
    if (!this.selectedFile) return;

    console.log('📤 Uploading actual file:', this.selectedFile.name);
    this.loading = true;

    // Use the ClientService method that uploads the actual file
    this.clientService.changeClientImage(this.selectedFile).subscribe(
      (response) => {
        console.log('✅ Image uploaded successfully:', response);
        alert('Image mise à jour avec succès');

        // Refresh client data to get new image URL from server
        this.loadClientFromDatabase();
        this.selectedFile = null; // Reset selected file
      },
      (error) => {
        console.error('❌ Error uploading image:', error);
        alert('Erreur lors de la mise à jour de l\'image');
        this.loading = false;
      }
    );
  }



  // ADD THIS METHOD - to get image URL with fallback
  */getImageUrl(): string {
    // If user has selected a new file, show preview
    const previewUrl = this.getImagePreviewUrl();
    if (previewUrl) {
      return previewUrl;
    }

    // If client has an image URL from database, use it
    if (this.client?.imageUrl) {
      return this.client.imageUrl;
    }

    // Default fallback image
    return '../../../assets/img/logos/admin.png';
  }  // ADD THIS METHOD - to get image preview URL for selected file
  getImagePreviewUrl(): string | null {
    if (this.selectedFile) {
      // Create a preview URL for the selected file
      return URL.createObjectURL(this.selectedFile);
    }
    return null;
  }
}
