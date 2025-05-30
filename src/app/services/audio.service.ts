import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private activePlayerId = new BehaviorSubject<string | null>(null);
  activePlayer$ = this.activePlayerId.asObservable();
  
  // Ajout d'un événement pour notifier l'arrêt de tous les lecteurs
  private stopAllPlayersSubject = new BehaviorSubject<boolean>(false);
  stopAllPlayers$ = this.stopAllPlayersSubject.asObservable();

  setActivePlayer(componentId: string) {
    // Si un autre lecteur est actif, on envoie d'abord un signal pour tout arrêter
    if (this.activePlayerId.value !== null && this.activePlayerId.value !== componentId) {
      this.stopAllPlayersSubject.next(true);
      // Petit délai pour laisser le temps aux lecteurs de s'arrêter
      setTimeout(() => {
        this.activePlayerId.next(componentId);
      }, 50);
    } else {
      this.activePlayerId.next(componentId);
    }
  }

  getActivePlayer(): string | null {
    return this.activePlayerId.value;
  }
  
  clearActivePlayer() {
    this.activePlayerId.next(null);
  }
  
  // Méthode pour arrêter tous les lecteurs audio
  stopAllAudio() {
    this.stopAllPlayersSubject.next(true);
    this.activePlayerId.next(null);
  }
}