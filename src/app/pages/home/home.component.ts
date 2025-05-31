import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSoundtracksComponent } from '../../widgets/player-soundtracks/player-soundtracks.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PlayerConfig } from '../../models/player-config.interface';
import { getPlayerConfigs } from '../../configs/player-configs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlayerSoundtracksComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('playersWrapper') playersWrapper!: ElementRef;
  
  isPlayingTestimonial = false;
  currentTestimonial = '';
  
  // Configuration pour les différents lecteurs
  PLAYER_CONFIGS: Record<string, PlayerConfig> = {};
  
  constructor(private translate: TranslateService) {}
  
  ngOnInit() {
    this.PLAYER_CONFIGS = getPlayerConfigs(this.translate);
  }
  
  // Fonction pour faire défiler le carrousel vers la gauche
  scrollToPrevious() {
    if (this.playersWrapper) {
      const container = this.playersWrapper.nativeElement;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
  
  // Fonction pour faire défiler le carrousel vers la droite
  scrollToNext() {
    if (this.playersWrapper) {
      const container = this.playersWrapper.nativeElement;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
  
  // Fonction pour lire/mettre en pause les témoignages audio
  togglePlayTestimonial(testimonialId: string) {
    if (this.currentTestimonial === testimonialId) {
      this.isPlayingTestimonial = !this.isPlayingTestimonial;
    } else {
      this.currentTestimonial = testimonialId;
      this.isPlayingTestimonial = true;
    }
    
    // Ici, vous pourriez ajouter la logique pour contrôler la lecture audio
    console.log(`${this.isPlayingTestimonial ? 'Playing' : 'Paused'} testimonial: ${testimonialId}`);
  }
}