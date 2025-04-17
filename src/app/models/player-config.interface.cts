
// models/player-config.interface.ts
export interface Track {
    id: number;
    title: string;
    artist: string;
    duration: string;
    url: string;
  }
  
  export interface PlayerConfig {
    sectionTitle: string;  // Pour le h2 (ex: "SOUNDTRACKS", "JINGLES", etc.)
    createButtonText: string;  // Pour le texte du bouton (ex: "CREATE MY SOUNDTRACK")
    tracks: Track[];
    typeformUrl?: string;  // URL spécifique pour chaque type de formulaire
}
