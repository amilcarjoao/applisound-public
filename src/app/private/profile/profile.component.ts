// src/app/private/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';


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

  constructor(private userService: UserService) {}
  
  ngOnInit() {
    // Récupérer les données utilisateur depuis le service
    this.user = this.userService.currentUserValue;
    
    // Si certaines informations manquent, on les initialise
    if (!this.user.phone) {
      this.user.phone = '';
    }
    if (!this.user.company) {
      this.user.company = '';
    }
    if (!this.user.avatar) {
      this.user.avatar = 'https://applisound-images.s3.eu-west-3.amazonaws.com/default-avatar.png';
    }
  }
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  saveProfile() {
    // Mettre à jour le profil utilisateur
    this.userService.updateUserProfile(this.user).subscribe({
      next: (response) => {
        // Mettre à jour l'utilisateur dans le service
        this.userService.updateCurrentUser(this.user);
        this.isEditing = false;
        alert('Profil mis à jour avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du profil:', err);
        alert('Une erreur est survenue lors de la mise à jour du profil.');
      }
    });
  }
}
