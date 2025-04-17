import { Component, OnInit, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimePipe } from "../../Pipes/time.pipe";
import { AudioService } from '../../services/audio.service';
import { Subscription } from 'rxjs';


// Je définis l'interface Track
interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
}


@Component({
  selector: 'app-player-soundtracks',
  standalone: true,
  imports: [CommonModule, RouterModule, TimePipe],
  templateUrl: './player-soundtracks.component.html',
  styleUrl: './player-soundtracks.component.scss'
})

export class PlayerSoundtracksComponent implements OnInit, OnDestroy {

  title = 'Soundtracks'; // Correspond au h2 du template


  // NE PAS SUPPRIMER CELA ON A BESOIN POUR APRES
  openTypeForm() {
    // Cette méthode sera implémentée plus tard pour ouvrir le formulaire
    console.log('Opening TypeForm...');
  }

  // LES TRACKS JE LAISSE
  tracks: Track[] = [

    {
      id: 1,
      title: "Bad Boy (Radio Edit)",
      artist: "Jeyslee",
      duration: "1:58",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/bad-boy-radio-edit.mp3"
    },
    {
      id: 2,
      title: "La Voie (Instrumental)",
      artist: "Jeyslee",
      duration: "3:52",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/la-voie-instru.mp3"
    },
    {
      id: 3,
      title: "Luanda Spotlights",
      artist: "Jeyslee",
      duration: "3:40",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee-Luanda+SpotlightsV2.mp3"
    },
    {
      id: 4,
      title: "Control",
      artist: "Jeyslee",
      duration: "2:26",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Control.mp3"
    },
    {
      id: 5,
      title: "EDLV Hymne",
      artist: "Jeyslee",
      duration: "3:17",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+EDLV+(Hymne)+v2.mp3"
    },
    {
      id: 6,
      title: "BYD",
      artist: "Jeyslee",
      duration: "0:40",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+Build+Your+Dreams+2.wav"
    },
    {
      id: 7,
      title: "Retroactive",
      artist: "Jeyslee",
      duration: "1:05",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+Retroactive+%5BInstrumental+v1%5D.wav"
    },
    {
      id: 8,
      title: "ZONE",
      artist: "Jeyslee & Yūutsu",
      duration: "3:14",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+%26+Y%C5%AButsu+-+Zone.mp3"
    },

  ];

  // LECTURE
  private componentId: string;
  private audioSubscription: Subscription;

  currentTrack: any = null;
  audio = new Audio();
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  progress = 0;
  repeat: 'none' | 'all' | 'one' = 'none';
  isDragging = false;

  ngOnInit() {
    // Initialiser la première piste au démarrage
    if (this.tracks.length > 0) {
      this.currentTrack = this.tracks[0];
      this.audio.src = this.tracks[0].url;
      this.audio.load();
    }
    this.setupAudioEvents();
  }

  // Modifier ngOnDestroy pour inclure le nettoyage de la subscription
  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
    this.audio.removeEventListener('timeupdate', () => {});
    this.audio.removeEventListener('loadedmetadata', () => {});
    this.audio.removeEventListener('ended', () => {});
    this.audio.removeEventListener('error', () => {});
    if (this.audioSubscription) {
      this.audioSubscription.unsubscribe();
    }
  }


  // Amélioration de la gestion des événements audio
  private setupAudioEvents() {
    this.audio.addEventListener('timeupdate', () => {
      if (!this.isDragging) {
        this.currentTime = this.audio.currentTime;
        this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('ended', () => {
      this.handleTrackEnd();
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Erreur audio:', e);
      this.isPlaying = false;
    });
  }

  // SERVICE AUDIO
  constructor(private audioService: AudioService) {
    // Générer un ID unique pour chaque instance du composant
    this.componentId = 'player_' + Math.random().toString(36).substr(2, 9);
    
    // S'abonner aux changements de lecteur actif
    this.audioSubscription = this.audioService.activePlayer$
      .subscribe(activeId => {
        if (activeId && activeId !== this.componentId && this.isPlaying) {
          this.audio.pause();
          this.isPlaying = false;
        }
      });
  }

  // PLAY TRACK
  // Modifier la méthode playTrack existante
  playTrack(track: any) {
    if (this.currentTrack?.id === track.id) {
      this.togglePlay();
      return;
    }

    if (this.currentTrack) {
      this.audio.pause();
    }

    this.currentTrack = track;
    this.audio.src = track.url;
    this.audio.load();
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.audioService.setActivePlayer(this.componentId);
    }).catch(error => {
      console.error('Erreur lors de la lecture:', error);
      this.isPlaying = false;
    });
  }

  // Modifier la méthode togglePlay existante
  togglePlay() {
    if (!this.currentTrack && this.tracks.length > 0) {
      this.playTrack(this.tracks[0]);
      return;
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
      this.audioService.setActivePlayer(this.componentId);
    }
    this.isPlaying = !this.isPlaying;
  }

  ///
  private handleTrackEnd() {
    const currentIndex = this.tracks.findIndex(t => t.id === this.currentTrack.id);
    
    switch (this.repeat) {
      case 'none':
        if (currentIndex < this.tracks.length - 1) {
          this.playTrack(this.tracks[currentIndex + 1]);
        } else {
          this.isPlaying = false;
          this.currentTime = 0;
          this.progress = 0;
        }
        break;

      case 'all':
        if (currentIndex < this.tracks.length - 1) {
          this.playTrack(this.tracks[currentIndex + 1]);
        } else {
          // Retour à la première piste
          this.playTrack(this.tracks[0]);
        }
        break;

      case 'one':
        // Rejouer la même piste
        this.audio.currentTime = 0;
        this.audio.play();
        break;
    }
  }


  // PREVIOUS
  previousTrack() {
    if (!this.currentTrack && this.tracks.length > 0) {
      // Si aucune piste n'est sélectionnée, commencer par la première
      this.playTrack(this.tracks[0]);
      return;
    }

    const currentIndex = this.tracks.findIndex(t => t.id === this.currentTrack.id);
    
    if (currentIndex > 0) {
      this.playTrack(this.tracks[currentIndex - 1]);
    } else if (this.repeat === 'all') {
      // Si on est à la première piste et que repeat all est activé
      this.playTrack(this.tracks[this.tracks.length - 1]);
    }
  }


  // NEXT
  nextTrack() {
    if (!this.currentTrack && this.tracks.length > 0) {
      // Si aucune piste n'est sélectionnée, commencer par la première
      this.playTrack(this.tracks[0]);
      return;
    }

    const currentIndex = this.tracks.findIndex(t => t.id === this.currentTrack.id);
    
    if (currentIndex < this.tracks.length - 1) {
      this.playTrack(this.tracks[currentIndex + 1]);
    } else if (this.repeat === 'all') {
      // Si on est à la dernière piste et que repeat all est activé
      this.playTrack(this.tracks[0]);
    }
  }

  toggleRepeat() {
    switch (this.repeat) {
      case 'none':
        this.repeat = 'all';
        break;
      case 'all':
        this.repeat = 'one';
        break;
      case 'one':
        this.repeat = 'none';
        break;
    }
  }

  startSeek(event: MouseEvent) {
    this.isDragging = true;
    this.seeking(event);
  }

  seeking(event: MouseEvent) {
    if (!this.isDragging) return;
    
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    this.progress = percent * 100;
  }

  endSeek() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.audio.currentTime = (this.progress / 100) * this.audio.duration;
  }


  // JE SAIS PAS SI JE GARDE
  onProgressClick(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const clickPosition = event.offsetX / progressBar.offsetWidth;
    this.audio.currentTime = this.audio.duration * clickPosition;
  }


}
