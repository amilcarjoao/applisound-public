// src/app/private/files/files.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit {
  audioFiles: any[] = [];
  
  ngOnInit() {
    // Simuler la récupération des fichiers audio
    this.audioFiles = [
      { 
        id: 'FILE-2023-001', 
        title: 'Custom Soundtrack.mp3', 
        size: '3.2 MB', 
        uploadDate: '2023-05-15',
        status: 'ready',
        type: 'soundtrack',
        description: 'Musique personnalisée pour votre vidéo promotionnelle'
      },
      { 
        id: 'FILE-2023-002', 
        title: 'Voice Over Project.wav', 
        size: '8.7 MB', 
        uploadDate: '2023-05-20',
        status: 'ready',
        type: 'voiceover',
        description: 'Voix off professionnelle pour votre présentation d\'entreprise'
      },
      { 
        id: 'FILE-2023-003', 
        title: 'Corporate Jingle.mp3', 
        size: '1.5 MB', 
        uploadDate: '2023-05-25',
        status: 'pending',
        type: 'jingle',
        description: 'Jingle pour votre marque, en cours de finalisation'
      }
    ];
  }
  
  playAudio(file: any) {
    console.log('Playing audio:', file);
    // Implémentation de la lecture audio
  }
  
  downloadAudio(file: any) {
    console.log('Downloading audio:', file);
    // Implémentation du téléchargement
  }
}
