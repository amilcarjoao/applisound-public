import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Imports
import { Output, EventEmitter, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-step-one.component.html',
  styleUrls: ['./form-step-one.component.scss'],
})
export class FormStepOneComponent implements OnInit {
  form!: FormGroup;
  serviceTypes: any[] = []; // Définir vos types de services ici
  durations: any[] = []; // Définir vos durées ici
  diffusionTypes: string[] = []; // Définir vos types de diffusion ici
  audioFormats: any[] = []; // Définir vos formats audio ici
  hasOtherFormat: boolean = false;
  isRecording: boolean = false;
  recordingTime: string = '00:00';
  minDate: string;

  constructor(private fb: FormBuilder) {
    // Initialiser la date minimale (aujourd'hui)
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
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

    // Pré-sélectionner le service si fourni
    if (this.serviceType) {
      // Logique pour pré-sélectionner le service
    }
  }

  // Ajoutez cette méthode
  goToNextStep() {
    if (this.form.valid) {
      this.next.emit(this.form.value);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.form);
    }
  }

  // Méthode utilitaire pour marquer tous les champs comme touchés
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Annuler le formulaire
  cancelForm() {
  this.cancel.emit();
}

  initData(): void {
    // Initialiser les données pour les sélections
    this.serviceTypes = [
      {
        id: 'soundtrack',
        label: 'Bande sonore',
        tooltip: 'Musique pour vos projets',
      },
      {
        id: 'jingle',
        label: 'Jingle',
        tooltip: 'Court extrait musical identitaire',
      },
      {
        id: 'voiceover',
        label: 'Voix off',
        tooltip: 'Narration professionnelle',
      },
      // Ajoutez d'autres services selon vos besoins
    ];

    this.durations = [
      { value: '30sec', label: '30 secondes' },
      { value: '1min', label: '1 minute' },
      { value: '2min', label: '2 minutes' },
      { value: 'custom', label: 'Autre durée' },
      // Ajoutez d'autres durées selon vos besoins
    ];

    this.diffusionTypes = ['Web', 'TV', 'Radio', 'Événementiel', 'Interne'];

    this.audioFormats = [
      { value: 'mp3', label: 'MP3' },
      { value: 'wav', label: 'WAV' },
      { value: 'aiff', label: 'AIFF' },
      { value: 'other', label: 'Autre' },
      // Ajoutez d'autres formats selon vos besoins
    ];
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
    // Logique pour gérer la sélection de format audio
  }

  onFileUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    // Logique pour gérer l'upload de fichier
  }

  toggleRecording(): void {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  startRecording(): void {
    // Logique pour démarrer l'enregistrement
    // Initialiser un timer pour afficher le temps d'enregistrement
  }

  stopRecording(): void {
    // Logique pour arrêter l'enregistrement
  }

  // Modal

  // Dans la classe -
  @Input() serviceType: string = '';
  @Output() next = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  
}
