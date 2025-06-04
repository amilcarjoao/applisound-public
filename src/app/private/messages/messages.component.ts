import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  newMessage: string = '';
  messages: any[] = [
    {
      id: 1,
      sender: 'team',
      content: 'Bonjour ! Comment pouvons-nous vous aider aujourd\'hui ?',
      timestamp: '2023-05-15T10:30:00',
      read: true
    },
    {
      id: 2,
      sender: 'user',
      content: 'J\'aimerais savoir quand mon fichier audio sera prêt.',
      timestamp: '2023-05-15T10:35:00',
      read: true
    },
    {
      id: 3,
      sender: 'team',
      content: 'Votre fichier audio est en cours de finalisation. Il devrait être disponible dans les 24 heures.',
      timestamp: '2023-05-15T10:40:00',
      read: true
    },
    {
      id: 4,
      sender: 'team',
      content: 'Votre fichier audio est maintenant disponible ! Vous pouvez le télécharger depuis votre dashboard.',
      timestamp: '2023-05-16T14:20:00',
      read: false
    }
  ];
  
  sendMessage() {
    if (!this.newMessage.trim()) return;
    
    // Ajouter le message à la liste
    this.messages.push({
      id: this.messages.length + 1,
      sender: 'user',
      content: this.newMessage,
      timestamp: new Date().toISOString(),
      read: true
    });
    
    // Réinitialiser le champ de message
    this.newMessage = '';
    
    // Simuler l'envoi d'un email à l'équipe Applisound
    console.log('Email sent to Applisound team');
    
    // Simuler une réponse automatique
    setTimeout(() => {
      this.messages.push({
        id: this.messages.length + 1,
        sender: 'team',
        content: 'Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.',
        timestamp: new Date().toISOString(),
        read: false
      });
    }, 1000);
  }
  
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
