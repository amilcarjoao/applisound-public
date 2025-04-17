import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private activePlayerId = new BehaviorSubject<string | null>(null);
  activePlayer$ = this.activePlayerId.asObservable();

  setActivePlayer(componentId: string) {
    if (this.activePlayerId.value !== componentId) {
      this.activePlayerId.next(componentId);
    }
  }

  getActivePlayer(): string | null {
    return this.activePlayerId.value;
  }
}
