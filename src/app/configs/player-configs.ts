import { PlayerConfig } from '../../app/models/player-config.interface.cjs';

export const PLAYER_CONFIGS: { [key: string]: PlayerConfig } = {
  soundtracks: {
    sectionTitle: 'SOUNDTRACKS',
    createButtonText: 'CREATE MY SOUNDTRACKS',
    typeformUrl: 'your-typeform-url-1',
    tracks: [
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
    ]
  },

  //JINGLES
  jingles: {
    sectionTitle: 'JINGLES',
    createButtonText: 'CREATE MY JINGLE',
    typeformUrl: 'your-typeform-url-2',
    tracks: [
      // Tracks pour les jingles
    ]
  },
  voiceovers: {
    sectionTitle: 'VOICEOVER',
    createButtonText: 'CREATE MY VOICEOVER',
    typeformUrl: 'your-typeform-url-3',
    tracks: [
      {
        id: 1,
        title: "SIMA",
        artist: "Amilcar JOAO",
        duration: "1:58",
        url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Voice_Update/haleine+dingue.wav"
      },
      {
        id: 2,
        title: "CIRMI WEBINAIRE",
        artist: "Amilcar Joao",
        duration: "0:00",
        url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Voice_Update/Cirmi+webinaire.mp3"
      },
      {
        id: 3,
        title: "CIRMI WEBINAIRE",
        artist: "Amilcar Joao",
        duration: "0:00",
        url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Voice_Update/Cirmi+webinaire.mp3"
      },
      {
        id: 4,
        title: "CIRMI WEBINAIRE",
        artist: "Amilcar Joao",
        duration: "0:00",
        url: "https://audio-applisound.s3.eu-west-3.amazonaws.com/soundtracks_homePage/Voice_Update/Cirmi+webinaire.mp3"
      }
    ]
  },
  assignment_music_rights: {
    sectionTitle: 'ASSIGNEMENT',
    createButtonText: 'GET MY ASSIGNEMENT OF RIGHTS',
    typeformUrl: 'your-typeform-url-3',
    tracks: [
      // Tracks pour les voiceovers
    ]
  },
  sound_design: {
    sectionTitle: 'SOUND DESIGN',
    createButtonText: 'CREATE MY SOUND DESIGN',
    typeformUrl: 'your-typeform-url-3',
    tracks: [
      // Tracks pour les voiceovers
    ]
  },
  hymns: {
    sectionTitle: 'HYMNS SOUNDTRACKS',
    createButtonText: 'CREATE MY HYMNS SOUNDTRACKS',
    typeformUrl: 'your-typeform-url-3',
    tracks: [
      // Tracks pour les voiceovers
    ]
  },


  // ... autres configurations ...
};
  