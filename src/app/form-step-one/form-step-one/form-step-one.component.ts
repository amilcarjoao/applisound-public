// form-step-one/form-step-one.component.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-step-one',
  templateUrl: './form-step-one.component.html',
  styleUrls: ['./form-step-one.component.scss']
})

export class FormStepOneComponent implements OnInit {
  
  form: FormGroup;
  
  serviceTypes = [
    { id: 'bandeSonore', label: 'Bandes sonores', tooltip: 'label explicatif' },
    { id: 'jingles', label: 'Jingles', tooltip: 'Identité Sonore' },
    { id: 'hymnes', label: 'Hymnes', tooltip: '' },
    { id: 'generiques', label: 'Génériques', tooltip: '' },
    { id: 'soundDesign', label: 'Sound Design', tooltip: '' },
    { id: 'voixOff', label: 'Voix-Off', tooltip: '' },
    { id: 'cessionDroits', label: 'Cession De Droits', tooltip: '' },
    { id: 'achatsDroits', label: 'Achats de droits musicaux', tooltip: '' }
  ];

  durations = [
    { value: '30-60', label: '30sec-1min' },
    { value: '60-120', label: '1min-2min' },
    { value: '120-240', label: '2min-4min' },
    { value: 'custom', label: 'Autre (préciser)' }
  ];

  diffusionTypes = [
    'Une salle', 'Sur le web', 'Publicité sponso', 'Cinéma', 
    'Conférence', 'Radio', 'Podcast', 'Diaporama', 'Webinair', 'TV'
  ];

  audioFormats = [
    { value: 'mp3', label: 'MP3' },
    { value: 'wav', label: 'WAV' },
    { value: 'flac', label: 'FLAC' },
    { value: 'ogg', label: 'OGG' },
    { value: 'other', label: 'Autre' }
  ];
recordingTime: any;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  private initForm() {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: [''],
        entreprise: ['']
      }),
      projectDescription: ['', Validators.required],
      selectedServices: this.fb.array([]),
      serviceCounts: this.fb.group({
        bandeSonore: [0],
        jingle: [0],
        hymne: [0],
        generique: [0],
        soundDesign: [0],
        voixOff: [0],
        doublageM: [0],
        doublageF: [0]
      }),
      duration: [''],
      customDuration: [''],
      diffusionPlaces: this.fb.array([]),
      audioFormats: this.fb.array([]),
      otherFormat: [''],
      rightsType: [''],
      demoOption: [''],
      reference: this.fb.group({
        type: [''],
        content: ['']
      }),
      appointment: this.fb.group({
        type: [''],
        date: [''],
        time: ['']
      })
    });
  }

  // Méthodes pour la gestion de l'enregistrement audio
  startRecording() {
    // Implémenter l'enregistrement audio
  }

  stopRecording() {
    // Arrêter l'enregistrement
  }

  // Méthode pour l'upload de fichier
  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= 5000000) { // 5MB max
      // Gérer l'upload
    } else {
      // Afficher une erreur
    }
  }
}
