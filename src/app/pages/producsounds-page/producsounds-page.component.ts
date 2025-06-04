import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-producsounds-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './producsounds-page.component.html',
  styleUrls: ['./producsounds-page.component.scss']
})
export class ProducsoundsPageComponent implements OnInit, OnDestroy {
  isPlaying: boolean = false;
  audio: HTMLAudioElement | null = null;
  
  currentTrack = {
    title: 'You Know',
    artist: 'Jeyslee',
    url: 'https://audio-applisound.s3.eu-west-3.amazonaws.com/coming_soon/Youknowapplisound.mp3' // Remplacez par un lien audio existant
  };

  constructor() {}

  ngOnInit(): void {
    this.initAudio();
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }

  initAudio(): void {
    this.audio = new Audio(this.currentTrack.url);
    this.audio.loop = true;
    this.audio.volume = 0.5;
    
    // Démarrer la lecture automatiquement (optionnel)
    // this.playAudio();
  }

  togglePlay(): void {
    if (!this.audio) return;
    
    if (this.isPlaying) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }

  playAudio(): void {
    if (!this.audio) return;
    
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch(error => {
        console.error('Erreur de lecture audio:', error);
      });
  }

  pauseAudio(): void {
    if (!this.audio) return;
    
    this.audio.pause();
    this.isPlaying = false;
  }

  stopAudio(): void {
    if (!this.audio) return;
    
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
}