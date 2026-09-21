import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParametrageService } from '../../services/parametrage.service';
import { LoginConfiguration, ModeIdentification } from '../../models/login-config.model';

@Component({
  selector: 'app-parametrage-acces-admin',
  templateUrl: './parametrage-acces-admin.component.html',
  styleUrls: ['./parametrage-acces-admin.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ParametrageAccesAdminComponent implements OnInit {

  parametrageForm!: FormGroup;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // ✅ Configuration options
  typeIdentificationOptions = [
    { value: 'standard', label: 'Standard (saisie du login/mdp)' },
    { value: 'intranet', label: 'Variable INTRANET' },
    { value: 'ldap', label: 'LDAP / Active Directory' }
  ];

  modeIdentificationOptions = [
    { value: ModeIdentification.MATRICULE, label: 'Matricule' },
    { value: ModeIdentification.BADGE, label: 'Numero de badge' },
    { value: ModeIdentification.BADGE_VISIBLE, label: 'Numero de badge visible' },
    { value: ModeIdentification.CODE_CLIENT, label: 'Code Client' },
    { value: ModeIdentification.EMAIL, label: 'Email' }
  ];

  constructor(
    private fb: FormBuilder,
    private parametrageService: ParametrageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentConfiguration();
  }

  // ✅ Initialize reactive form
  private initializeForm(): void {
    this.parametrageForm = this.fb.group({
      typeIdentification: ['standard', Validators.required],
      modeIdentification: [ModeIdentification.MATRICULE, Validators.required],
      libelleIdentifiant: ['Identifiant (Client)', [Validators.required, Validators.minLength(3)]],
      
      // Admin credentials
      loginAdministrateur: ['Administrateur', [Validators.required, Validators.minLength(3)]],
      motDePasseAdministrateur: ['a.123', [Validators.required, Validators.minLength(4)]],
      
      // Gestionnaires
      loginGestionnaire1: ['gil1', [Validators.required, Validators.minLength(3)]],
      motDePasseGestionnaire1: ['a.123', [Validators.required, Validators.minLength(4)]],
      
      loginGestionnaire2: ['vroubaix2'],
      motDePasseGestionnaire2: ['4048'],
      
      loginGestionnaire3: ['gil2'],
      motDePasseGestionnaire3: ['4048']
    });

    // ✅ Listen to mode changes and update label
    this.parametrageForm.get('modeIdentification')?.valueChanges.subscribe(mode => {
      this.updateLibelleIdentifiant(mode);
    });
  }

  // ✅ Update label based on selected mode
  private updateLibelleIdentifiant(mode: string): void {
    let newLabel = '';
    
    switch (mode) {
      case ModeIdentification.EMAIL:
        newLabel = 'Adresse email';
        break;
      case ModeIdentification.MATRICULE:
        newLabel = 'Matricule';
        break;
      case ModeIdentification.BADGE:
        newLabel = 'Numéro de badge';
        break;
      case ModeIdentification.BADGE_VISIBLE:
        newLabel = 'Numéro de badge visible';
        break;
      case ModeIdentification.CODE_CLIENT:
        newLabel = 'Code client';
        break;
      default:
        newLabel = 'Identifiant';
    }
    
    this.parametrageForm.patchValue({
      libelleIdentifiant: newLabel
    });
  }

  // ✅ Load current configuration
  private loadCurrentConfiguration(): void {
    this.loading = true;
    
    this.parametrageService.getLoginConfiguration().subscribe({
      next: (config: LoginConfiguration) => {
        this.parametrageForm.patchValue({
          typeIdentification: config.typeIdentification,
          modeIdentification: config.modeIdentification,
          libelleIdentifiant: config.libelleIdentifiant,
          loginAdministrateur: config.adminConfig.login,
          motDePasseAdministrateur: config.adminConfig.password,
          loginGestionnaire1: config.gestionnaires[0]?.login || 'gil1',
          motDePasseGestionnaire1: config.gestionnaires[0]?.password || 'a.123',
          loginGestionnaire2: config.gestionnaires[1]?.login || 'vroubaix2',
          motDePasseGestionnaire2: config.gestionnaires[1]?.password || '4048',
          loginGestionnaire3: config.gestionnaires[2]?.login || 'gil2',
          motDePasseGestionnaire3: config.gestionnaires[2]?.password || '4048'
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading configuration:', error);
        this.loading = false;
        // Keep default values
      }
    });
  }

  // ✅ Save configuration
  onSubmit(): void {
    if (this.parametrageForm.invalid) {
      this.markFormGroupTouched(this.parametrageForm);
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.parametrageForm.value;
    
    const configuration: LoginConfiguration = {
      typeIdentification: formData.typeIdentification,
      modeIdentification: formData.modeIdentification,
      libelleIdentifiant: formData.libelleIdentifiant,
      adminConfig: {
        login: formData.loginAdministrateur,
        password: formData.motDePasseAdministrateur
      },
      gestionnaires: [
        {
          login: formData.loginGestionnaire1,
          password: formData.motDePasseGestionnaire1
        },
        {
          login: formData.loginGestionnaire2 || '',
          password: formData.motDePasseGestionnaire2 || ''
        },
        {
          login: formData.loginGestionnaire3 || '',
          password: formData.motDePasseGestionnaire3 || ''
        }
      ]
    };

    // ✅ Save configuration
    this.parametrageService.saveLoginConfiguration(configuration).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Configuration sauvegardée avec succès! Les clients devront maintenant se connecter avec: ' + this.getSelectedModeLabel();
        
        // ✅ Update global login configuration
        this.parametrageService.updateGlobalLoginMode(configuration.modeIdentification);
        
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la sauvegarde de la configuration';
        console.error('Error saving configuration:', error);
      }
    });
  }

  // ✅ Get selected mode label for display
  private getSelectedModeLabel(): string {
    const selectedMode = this.parametrageForm.get('modeIdentification')?.value;
    const option = this.modeIdentificationOptions.find(opt => opt.value === selectedMode);
    return option ? option.label : 'Mode sélectionné';
  }

  // ✅ Utility methods
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.parametrageForm.get(fieldName);
    if (!field) return false;
    
    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    return field.invalid && (field.dirty || field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.parametrageForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return 'Ce champ est obligatoire';
    }
    if (field.errors['minlength']) {
      const requiredLength = field.errors['minlength'].requiredLength;
      return `Minimum ${requiredLength} caractères requis`;
    }
    return 'Valeur invalide';
  }

  onReset(): void {
    this.parametrageForm.reset();
    this.initializeForm();
    this.errorMessage = '';
    this.successMessage = '';
  }
}
