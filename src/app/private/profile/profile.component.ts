// src/app/private/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  isEditing: boolean = false;
  
  ngOnInit() {
    // Simuler la récupération des données utilisateur
    this.user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+33 6 12 34 56 78',
      company: 'Acme Inc.',
      avatar: 'https://applisound-images.s3.eu-west-3.amazonaws.com/default-avatar.png'
    };
  }
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  saveProfile() {
    // Simuler la sauvegarde du profil
    console.log('Saving profile:', this.user);
    this.isEditing = false;
    
    // Afficher un message de confirmation
    alert('Profil mis à jour avec succès !');
  }
}
