import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TimePipe } from "../../Pipes/time.pipe";
import { AudioService } from '../../services/audio.service';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
  category: string;
  mood: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-music-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, TimePipe],
  templateUrl: './music-page.component.html',
  styleUrl: './music-page.component.scss'
})
export class MusicPageComponent implements OnInit {
  // Audio player state
  currentTrack: Track | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  progress = 0;
  volume = 100;
  repeat: 'none' | 'all' | 'one' = 'none';
  shuffle = false;
  isDragging = false;
  audio = new Audio();
  
  // Filters
  searchQuery = '';
  selectedCategory = 'all';
  selectedMood = 'all';
  
  // Categories and moods
  categories = [
    { id: 'all', name: 'All' },
    { id: 'soundtracks', name: 'Soundtracks' },
    { id: 'jingles', name: 'Jingles' },
    { id: 'voiceovers', name: 'Voice Overs' },
    { id: 'hymns', name: 'Hymns' },
    { id: 'sound_design', name: 'Sound Design' }
  ];
  
  moods = [
    { id: 'all', name: 'All Moods' },
    { id: 'energetic', name: 'Energetic' },
    { id: 'calm', name: 'Calm' },
    { id: 'happy', name: 'Happy' },
    { id: 'sad', name: 'Sad' },
    { id: 'epic', name: 'Epic' },
    { id: 'mysterious', name: 'Mysterious' },
    { id: 'romantic', name: 'Romantic' },
    { id: 'corporate', name: 'Corporate' }
  ];
  
  // Tracks data
  allTracks: Track[] = [
    {
      id: 1,
      title: "Bad Boy (Radio Edit)",
      artist: "Jeyslee",
      duration: "1:58",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/bad-boy-radio-edit.mp3",
      category: "soundtracks",
      mood: ["energetic", "happy"],
      featured: true
    },
    {
      id: 2,
      title: "La Voie (Instrumental)",
      artist: "Jeyslee",
      duration: "3:52",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/la-voie-instru.mp3",
      category: "soundtracks",
      mood: ["calm", "mysterious"]
    },
    {
      id: 3,
      title: "Luanda Spotlights",
      artist: "Jeyslee",
      duration: "3:40",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee-Luanda+SpotlightsV2.mp3",
      category: "soundtracks",
      mood: ["energetic", "happy"]
    },
    {
      id: 4,
      title: "Control",
      artist: "Jeyslee",
      duration: "2:26",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Control.mp3",
      category: "soundtracks",
      mood: ["epic", "energetic"]
    },
    {
      id: 5,
      title: "EDLV Hymne",
      artist: "Jeyslee",
      duration: "3:17",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+EDLV+(Hymne)+v2.mp3",
      category: "hymns",
      mood: ["epic", "corporate"]
    },
    {
      id: 6,
      title: "BYD",
      artist: "Jeyslee",
      duration: "0:40",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+Build+Your+Dreams+2.wav",
      category: "jingles",
      mood: ["corporate", "energetic"]
    },
    {
      id: 7,
      title: "Retroactive",
      artist: "Jeyslee",
      duration: "1:05",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+-+Retroactive+%5BInstrumental+v1%5D.wav",
      category: "sound_design",
      mood: ["mysterious", "calm"]
    },
    {
      id: 8,
      title: "ZONE",
      artist: "Jeyslee & Yūutsu",
      duration: "3:14",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Jeyslee+%26+Y%C5%AButsu+-+Zone.mp3",
      category: "soundtracks",
      mood: ["energetic", "happy"]
    },
    {
      id: 9,
      title: "SIMA",
      artist: "Amilcar JOAO",
      duration: "1:58",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Voice_Update/haleine+dingue.wav",
      category: "voiceovers",
      mood: ["corporate"]
    },
    {
      id: 10,
      title: "CIRMI WEBINAIRE",
      artist: "Amilcar Joao",
      duration: "0:30",
      url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Voice_Update/Cirmi+webinaire.mp3",
      category: "voiceovers",
      mood: ["corporate", "calm"]
    }
  ];
  
  // Filtered tracks
  filteredTracks: Track[] = [];
  
  // Component ID for audio service
  private componentId: string;
  
  constructor(private audioService: AudioService) {
    this.componentId = 'music_player_' + Math.random().toString(36).substr(2, 9);
  }
  
  ngOnInit() {
    this.filteredTracks = [...this.allTracks];
    this.setupAudioEvents();
  }
  
  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
    this.audio.removeEventListener('timeupdate', () => {});
    this.audio.removeEventListener('loadedmetadata', () => {});
    this.audio.removeEventListener('ended', () => {});
    this.audio.removeEventListener('error', () => {});
  }
  
  // Filter tracks based on search, category and mood
  filterTracks() {
    this.filteredTracks = this.allTracks.filter(track => {
      // Search filter
      const searchMatch = this.searchQuery === '' || 
        track.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Category filter
      const categoryMatch = this.selectedCategory === 'all' || 
        track.category === this.selectedCategory;
      
      // Mood filter
      const moodMatch = this.selectedMood === 'all' || 
        track.mood.includes(this.selectedMood);
      
      return searchMatch && categoryMatch && moodMatch;
    });
  }
  
  // Audio player methods
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
      console.error('Code d\'erreur:', this.audio.error ? this.audio.error.code : 'inconnu');
      console.error('URL audio:', this.audio.src);
      this.isPlaying = false;
    });
  }
  
  playTrack(track: Track) {
    if (this.currentTrack?.id === track.id) {
      this.togglePlay();
      return;
    }

    if (this.currentTrack) {
      this.audio.pause();
    }

    this.currentTrack = track;
    
    try {
      if (!track.url) {
        console.error('URL audio invalide:', track.url);
        this.isPlaying = false;
        return;
      }
      
      this.audio.src = track.url;
      this.audio.load();
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.audioService.setActivePlayer(this.componentId);
      }).catch(error => {
        console.error('Erreur lors de la lecture:', error);
        this.isPlaying = false;
      });
    } catch (e) {
      console.error('Exception lors de la lecture:', e);
      this.isPlaying = false;
    }
  }
  
  togglePlay() {
    if (!this.currentTrack && this.filteredTracks.length > 0) {
      this.playTrack(this.filteredTracks[0]);
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
  
  private handleTrackEnd() {
    if (!this.currentTrack) return;
    
    const currentIndex = this.filteredTracks.findIndex(t => t.id === this.currentTrack!.id);
    
    switch (this.repeat) {
      case 'none':
        if (currentIndex < this.filteredTracks.length - 1) {
          this.playTrack(this.filteredTracks[currentIndex + 1]);
        } else {
          this.isPlaying = false;
          this.currentTime = 0;
          this.progress = 0;
        }
        break;

      case 'all':
        if (currentIndex < this.filteredTracks.length - 1) {
          this.playTrack(this.filteredTracks[currentIndex + 1]);
        } else {
          this.playTrack(this.filteredTracks[0]);
        }
        break;

      case 'one':
        this.audio.currentTime = 0;
        this.audio.play();
        break;
    }
  }
  
  previousTrack() {
    if (!this.currentTrack && this.filteredTracks.length > 0) {
      this.playTrack(this.filteredTracks[0]);
      return;
    }

    if (!this.currentTrack) return;
    
    const currentIndex = this.filteredTracks.findIndex(t => t.id === this.currentTrack!.id);
    
    if (currentIndex > 0) {
      this.playTrack(this.filteredTracks[currentIndex - 1]);
    } else if (this.repeat === 'all') {
      this.playTrack(this.filteredTracks[this.filteredTracks.length - 1]);
    }
  }
  
  nextTrack() {
    if (!this.currentTrack && this.filteredTracks.length > 0) {
      this.playTrack(this.filteredTracks[0]);
      return;
    }

    if (!this.currentTrack) return;
    
    const currentIndex = this.filteredTracks.findIndex(t => t.id === this.currentTrack!.id);
    
    if (currentIndex < this.filteredTracks.length - 1) {
      this.playTrack(this.filteredTracks[currentIndex + 1]);
    } else if (this.repeat === 'all') {
      this.playTrack(this.filteredTracks[0]);
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
  
  toggleShuffle() {
    this.shuffle = !this.shuffle;
    if (this.shuffle) {
      // Shuffle the tracks
      this.filteredTracks = [...this.filteredTracks].sort(() => Math.random() - 0.5);
    } else {
      // Restore original order
      this.filterTracks();
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
  
  setVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseInt(input.value);
    this.audio.volume = this.volume / 100;
  }
  
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }
  
  getMoodNames(moodIds: string[]): string {
    return moodIds.map(id => {
      const mood = this.moods.find(m => m.id === id);
      return mood ? mood.name : id;
    }).join(', ');
  }
}
