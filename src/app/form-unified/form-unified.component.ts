// form-unified.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form-unified',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-unified.component.html',
  styleUrls: ['./form-unified.component.scss'],
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

  // Ajoutez cette méthode pour initialiser les données
initData(): void {
  // Initialiser les types de services
  this.serviceTypes = [
    { id: 'soundtrack', label: 'Bande sonore', tooltip: 'Musique pour vos projets' },
    { id: 'voiceover', label: 'Voix off', tooltip: 'Narration professionnelle' },
    { id: 'jingle', label: 'Jingle', tooltip: 'Court extrait musical identitaire' },
    { id: 'sounddesign', label: 'Sound Design', tooltip: 'Création d\'ambiances et effets sonores' },
    { id: 'hymne', label: 'Hymne-Générique', tooltip: 'Composition musicale identitaire pour marque ou organisation' },
    { id: 'droits', label: 'Cession de droits', tooltip: 'Acquisition de droits d\'utilisation pour contenus audio' }
  ];

  // Initialiser les durées
  this.durations = [
    { value: '30sec', label: '30 secondes' },
    { value: '1min', label: '1 minute' },
    { value: '2min', label: '2 minutes' },
    { value: 'custom', label: 'Autre durée' }
  ];

  // Initialiser les types de diffusion
  this.diffusionTypes = ['Web', 'TV', 'Radio', 'Événementiel', 'Interne'];

  // Initialiser les formats audio
  this.audioFormats = [
    { value: 'mp3', label: 'MP3' },
    { value: 'wav', label: 'WAV' },
    { value: 'aiff', label: 'AIFF' },
    { value: 'other', label: 'Autre' }
  ];
}

  serviceDurations: { [key: string]: any[] } = {
    soundtrack: [
      { value: '30sec', label: '30 secondes', price: 70 },
      { value: '1min', label: '1 minute', price: 85 },
      { value: '2min', label: '2 minutes', price: 105 },
      { value: '5min', label: '5 minutes', price: 130 },
      { value: 'orchestra', label: 'Avec orchestre', price: 170 },
    ],
    jingle: [
      { value: '30sec', label: '30 secondes', price: 160 },
      { value: '2min', label: '2 minutes', price: 250 },
      { value: 'lyrics', label: 'Avec paroles', price: 2000 },
      { value: 'orchestra', label: 'Avec orchestre', price: 3500 },
    ],
    voiceover: [
      { value: '30sec', label: '30 secondes (voix masculine)', price: 50 },
      { value: '2min', label: '2 minutes (voix féminine)', price: 80 },
      {
        value: 'native-male',
        label: 'Langue maternelle (voix masculine)',
        price: 100,
      },
      {
        value: 'native-female',
        label: 'Langue maternelle (voix féminine)',
        price: 120,
      },
      { value: '5min', label: '5 minutes (professionnel)', price: 130 },
    ],
    sounddesign: [
      { value: 'effect', label: 'Effet sonore', price: 9 },
      { value: '30sec', label: 'Ambiance sonore (30 secondes)', price: 70 },
      { value: '2min', label: 'Ambiance sonore (2 minutes)', price: 85 },
      { value: 'pack10', label: 'Pack de 10 effets sonores', price: 105 },
      { value: 'custom', label: 'Pack personnalisé', price: 299 },
    ],
    hymne: [
      { value: '2min', label: 'Format court (2 minutes)', price: 299 },
      { value: '5min', label: 'Format moyen (5 minutes)', price: 499 },
      { value: 'lyrics', label: "Hymne d'entreprise avec paroles", price: 999 },
      {
        value: 'orchestra',
        label: "Hymne d'organisation avec orchestre",
        price: 1499,
      },
    ],
    droits: [
      { value: 'limited', label: 'Licence limitée (1 an)', price: 200 },
      { value: 'extended', label: 'Licence étendue (5 ans)', price: 500 },
      { value: 'unlimited', label: 'Licence illimitée', price: 1000 },
      { value: 'exclusive', label: 'Droits exclusifs', price: 2000 },
    ],
  };

  // Services sélectionnés avec leurs durées et quantités
  selectedServices: {
    serviceId: string;
    serviceName: string;
    duration: string;
    durationLabel: string;
    price: number;
    quantity: number;
  }[] = [];

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
  const serviceControl = document.getElementById(`service-options-${serviceId}`);
  
  if (serviceControl) {
    if (isChecked) {
      serviceControl.classList.remove('hidden');
    } else {
      serviceControl.classList.add('hidden');
      // Supprimer ce service des services sélectionnés
      this.selectedServices = this.selectedServices.filter(s => s.serviceId !== serviceId);
    }
  }
}

onServiceDurationChange(event: Event, serviceId: string): void {
  const selectElement = event.target as HTMLSelectElement;
  const durationValue = selectElement.value;
  
  if (!durationValue) return;
  
  // Trouver le service dans la liste
  const service = this.serviceTypes.find(s => s.id === serviceId);
  if (!service) return;
  
  // Trouver la durée sélectionnée
  const duration = this.serviceDurations[serviceId].find(d => d.value === durationValue);
  if (!duration) return;
  
  // Vérifier si ce service avec cette durée existe déjà
  const existingIndex = this.selectedServices.findIndex(
    s => s.serviceId === serviceId && s.duration === durationValue
  );
  
  if (existingIndex >= 0) {
    // Mettre à jour la quantité
    const quantityInput = document.getElementById(`quantity-${serviceId}-${durationValue}`) as HTMLInputElement;
    if (quantityInput) {
      this.selectedServices[existingIndex].quantity = parseInt(quantityInput.value) || 1;
    }
  } else {
    // Ajouter un nouveau service
    this.selectedServices.push({
      serviceId: serviceId,
      serviceName: service.label,
      duration: durationValue,
      durationLabel: duration.label,
      price: duration.price,
      quantity: 1
    });
  }
   // Mettre à jour le formulaire
  this.formDataService.updateFormData({ selectedServices: this.selectedServices });

}

updateServiceQuantity(serviceId: string, durationValue: string, event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  
  const quantity = parseInt(target.value) || 1;
  
  const index = this.selectedServices.findIndex(
    s => s.serviceId === serviceId && s.duration === durationValue
  );
  
  if (index >= 0) {
    this.selectedServices[index].quantity = quantity;
    // Mettre à jour le formulaire
    this.formDataService.updateFormData({ selectedServices: this.selectedServices });
  }
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
        let servicesHtml = `
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Durée</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
        `;
        
        let totalPrice = 0;
        
        // Ajouter les services sélectionnés
        this.selectedServices.forEach(service => {
          const serviceTotal = service.price * service.quantity;
          totalPrice += serviceTotal;
          
          servicesHtml += `
            <tr>
              <td>${service.serviceName}</td>
              <td>${service.durationLabel}</td>
              <td>${service.quantity}</td>
              <td>€${service.price}</td>
              <td>€${serviceTotal}</td>
            </tr>
          `;
        });
        
        servicesHtml += `
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="text-align: right;"><strong>Total HT:</strong></td>
                <td>€${totalPrice}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: right;"><strong>TVA (20%):</strong></td>
                <td>€${(totalPrice * 0.2).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: right;"><strong>Total TTC:</strong></td>
                <td>€${(totalPrice * 1.2).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        `;
        
        devisDetails.innerHTML = servicesHtml;
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
