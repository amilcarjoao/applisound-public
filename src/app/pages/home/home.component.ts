import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSoundtracksComponent } from "../../widgets/player-soundtracks/player-soundtracks.component";
import { PLAYER_CONFIGS } from '../../configs/player-configs';
import { AudioService } from '../../services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlayerSoundtracksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, OnDestroy {

  protected PLAYER_CONFIGS = PLAYER_CONFIGS;
  
  // Variables pour le mini-player des témoignages
  isPlayingTestimonial: boolean = false;
  currentTestimonial: string = '';
  testimonialAudio: HTMLAudioElement | null = null;
  
  // Subscription pour écouter les événements du service audio
  private audioSubscription: Subscription = new Subscription();
  
  constructor(private audioService: AudioService) {}
  
  // NE PAS TOUCHER CE CODE - C'EST POUR LA CAROUSEL
  @ViewChild('playersWrapper') playersWrapper!: ElementRef;
  private isDragging = false;
  private startX: number = 0;
  private initialScrollLeft: number = 0;

  ngAfterViewInit() {
    const wrapper = this.playersWrapper.nativeElement;
    
    wrapper.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.startX = e.pageX - wrapper.offsetLeft;
      this.initialScrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    wrapper.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    wrapper.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      wrapper.scrollLeft = this.initialScrollLeft - walk;
    });
  }

  scrollToPrevious() {
    const wrapper = this.playersWrapper.nativeElement;
    wrapper.scrollBy({
      left: -500,
      behavior: 'smooth'
    });
  }

  scrollToNext() {
    const wrapper = this.playersWrapper.nativeElement;
    wrapper.scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  }

  // Fonction pour gérer la lecture audio des témoignages
  togglePlayTestimonial(id: string) {
    // Arrêter tous les autres lecteurs audio via le service
    this.audioService.stopAllAudio();
    
    // Si c'est le même audio, basculer entre lecture et pause
    if (this.currentTestimonial === id && this.testimonialAudio) {
      if (this.isPlayingTestimonial) {
        this.testimonialAudio.pause();
        this.isPlayingTestimonial = false;
        this.audioService.clearActivePlayer();
      } else {
        this.testimonialAudio.play();
        this.isPlayingTestimonial = true;
        this.audioService.setActivePlayer('testimonial-' + id);
      }
      return;
    }
    
    // Si un autre audio testimonial est en cours de lecture, l'arrêter
    if (this.testimonialAudio) {
      this.testimonialAudio.pause();
      this.testimonialAudio = null;
      this.isPlayingTestimonial = false;
    }
    
    // Si c'est un nouvel audio, le créer et le lire
    this.currentTestimonial = id;
    
    // URL de l'audio en fonction de l'ID
    let audioUrl = '';
    if (id === 'kia') {
      audioUrl = 'https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+Build+Your+Dreams+2.wav';
    }
    
    if (audioUrl) {
      this.testimonialAudio = new Audio(audioUrl);
      this.testimonialAudio.addEventListener('ended', () => {
        this.isPlayingTestimonial = false;
        this.audioService.clearActivePlayer();
      });
      this.testimonialAudio.play();
      this.isPlayingTestimonial = true;
      this.audioService.setActivePlayer('testimonial-' + id);
    }
  }
  
  ngOnInit() {
    // S'abonner aux événements d'arrêt de tous les lecteurs
    this.audioSubscription = this.audioService.stopAllPlayers$.subscribe(stop => {
      if (stop && this.testimonialAudio && this.isPlayingTestimonial) {
        this.testimonialAudio.pause();
        this.isPlayingTestimonial = false;
      }
    });
  }
  
  ngOnDestroy() {
    // Arrêter la lecture audio lors de la destruction du composant
    if (this.testimonialAudio) {
      this.testimonialAudio.pause();
      this.testimonialAudio = null;
    }
    
    // Se désabonner pour éviter les fuites de mémoire
    this.audioSubscription.unsubscribe();
  }
}