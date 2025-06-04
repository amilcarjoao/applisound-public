// src/app/private/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  audioFiles: any[] = [];
  unreadMessages: number = 0;
  
  constructor() {}
  
  ngOnInit() {
    // Simuler la récupération des données utilisateur
    this.user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://applisound-images.s3.eu-west-3.amazonaws.com/default-avatar.png'
    };
    
    // Simuler la récupération des fichiers audio
    this.audioFiles = [
      { 
        id: 'FILE-2023-001', 
        title: 'Custom Soundtrack.mp3', 
        size: '3.2 MB', 
        uploadDate: '2023-05-15',
        status: 'ready',
        type: 'soundtrack'
      },
      { 
        id: 'FILE-2023-002', 
        title: 'Voice Over Project.wav', 
        size: '8.7 MB', 
        uploadDate: '2023-05-20',
        status: 'ready',
        type: 'voiceover'
      },
      { 
        id: 'FILE-2023-003', 
        title: 'Corporate Jingle.mp3', 
        size: '1.5 MB', 
        uploadDate: '2023-05-25',
        status: 'pending',
        type: 'jingle'
      }
    ];
    
    // Simuler le nombre de messages non lus
    this.unreadMessages = 1;
  }
  
  playAudio(file: any) {
    console.log('Playing audio:', file);
    // Implémentation de la lecture audio
  }
  
  downloadAudio(file: any) {
    console.log('Downloading audio:', file);
    // Implémentation du téléchargement
  }
  
  openMessages() {
    console.log('Opening messages');
    // Navigation vers la page de messages
  }
}
