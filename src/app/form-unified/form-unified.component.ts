// form-unified.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-unified',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-unified.component.html',
  styleUrls: ['./form-unified.component.scss']
})
export class FormUnifiedComponent implements OnInit {
  @Input() serviceType: string = '';
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() complete = new EventEmitter<any>();

  currentStep: 'one' | 'two' | 'three' = 'one';
  form!: FormGroup;
  
  // Propriétés de l'étape 1
  serviceTypes: any[] = [];
  durations: any[] = [];
  diffusionTypes: string[] = [];
  audioFormats: any[] = [];
  hasOtherFormat: boolean = false;
  isRecording: boolean = false;
  recordingTime: string = '00:00';
  minDate: string;
  
  // Propriétés de l'étape 3
  hasSignature = false;
  isLoggedIn = false;
  private signaturePad: any;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
    
    // Charger les données sauvegardées
    const savedData = this.formDataService.getFormData();
    if (savedData && Object.keys(savedData).length > 0) {
      this.form.patchValue(savedData);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: [''],
        entreprise: [''],
      }),
      projectDescription: ['', Validators.required],
      duration: [''],
      customDuration: [''],
      serviceCounts: this.fb.group({}),
      otherFormat: [''],
      rightsType: [''],
      demoOption: [''],
      referenceType: [''],
      referenceLink: [''],
      appointment: this.fb.group({
        type: ['visio'],
        date: [''],
        time: [''],
      }),
    });
  }

  initData(): void {
    // Initialiser les données pour les sélections (comme dans FormStepOneComponent)
    this.serviceTypes = [
      { id: 'soundtrack', label: 'Bande sonore', tooltip: 'Musique pour vos projets' },
      { id: 'jingle', label: 'Jingle', tooltip: 'Court extrait musical identitaire' },
      { id: 'voiceover', label: 'Voix off', tooltip: 'Narration professionnelle' },
    ];

    this.durations = [
      { value: '30sec', label: '30 secondes' },
      { value: '1min', label: '1 minute' },
      { value: '2min', label: '2 minutes' },
      { value: 'custom', label: 'Autre durée' },
    ];

    this.diffusionTypes = ['Web', 'TV', 'Radio', 'Événementiel', 'Interne'];

    this.audioFormats = [
      { value: 'mp3', label: 'MP3' },
      { value: 'wav', label: 'WAV' },
      { value: 'aiff', label: 'AIFF' },
      { value: 'other', label: 'Autre' },
    ];
  }

  // Navigation entre les étapes
  goToNextStep() {
    if (this.currentStep === 'one') {
      if (this.form.valid) {
        this.formDataService.updateFormData(this.form.value);
        this.currentStep = 'two';
      } else {
        this.markFormGroupTouched(this.form);
      }
    } else if (this.currentStep === 'two') {
      this.currentStep = 'three';
      // Générer le devis basé sur les données du formulaire
      this.generateDevis();
    }
  }

  goToPreviousStep() {
    if (this.currentStep === 'three') {
      this.currentStep = 'two';
    } else if (this.currentStep === 'two') {
      this.currentStep = 'one';
    }
  }

  cancelForm() {
    this.cancel.emit();
  }

  // Méthodes de l'étape 1
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onServiceSelect(event: Event, serviceId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    // Logique pour gérer la sélection de service
  }

  onDurationChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    // Logique pour gérer le changement de durée
  }

  onDiffusionSelect(event: Event, diffusionType: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    // Logique pour gérer la sélection de lieu de diffusion
  }

  onFormatSelect(event: Event, formatValue: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (formatValue === 'other') {
      this.hasOtherFormat = isChecked;
    }
  }

  onFileUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    // Logique pour gérer l'upload de fichier
  }

  toggleRecording(): void {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      // Logique pour démarrer l'enregistrement
    } else {
      // Logique pour arrêter l'enregistrement
    }
  }

  // Méthodes de l'étape 3
  generateDevis() {
    // Utiliser this.form.value pour générer le contenu du devis
    setTimeout(() => {
      const devisContent = document.querySelector('.devis-content') as HTMLElement;
      if (devisContent && this.form.value.personalInfo) {
        const personalInfo = this.form.value.personalInfo;
        
        // Informations client
        const clientInfo = devisContent.querySelector('.client-info') as HTMLElement;
        if (clientInfo) {
          clientInfo.innerHTML = `
            <h4>Client</h4>
            <p>${personalInfo.nom} ${personalInfo.prenom}</p>
            <p>${personalInfo.email}</p>
            <p>${personalInfo.telephone || ''}</p>
            <p>${personalInfo.entreprise || ''}</p>
          `;
        }
        
        // Détails du projet
        const devisDetails = devisContent.querySelector('.devis-details') as HTMLElement;
        if (devisDetails) {
          // Exemple de table avec services
          devisDetails.innerHTML = `
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service exemple</td>
                  <td>1</td>
                  <td>€100</td>
                </tr>
              </tbody>
            </table>
          `;
        }
      }
    }, 100);
  }

  initializeSignaturePad() {
    const canvas = document.querySelector('canvas');
    // Initialisation du pad de signature
    this.hasSignature = false;
  }

  clearSignature() {
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.hasSignature = false;
    }
  }

  validateSignature() {
    if (this.hasSignature) {
      // Logique de validation de signature
      this.complete.emit({
        signature: 'signature_data',
        timestamp: new Date().toISOString(),
      });
    }
  }

  saveDraftAndReturn() {
    // Sauvegarder l'état actuel
    this.formDataService.updateFormData(this.form.value);
    this.cancel.emit();
  }

  createAccount() {
    // Logique de création de compte
  }
}
