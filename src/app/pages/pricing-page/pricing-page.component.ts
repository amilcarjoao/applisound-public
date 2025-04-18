import { Component, ViewChild, ElementRef } from '@angular/core';

interface PricingCard {
  title: string;
  services: Array<{
    name: string;
    price: string;
    details?: string;
  }>;
}

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  pricingCards: PricingCard[] = [
    {
      title: 'SOUNDTRACKS',
      services: [
        { name: 'Existing Library', price: 'FREE', details: '(Limited Rights)' },
        { name: 'Custom 30 seconds', price: '€70' },
        { name: 'Custom 1-2 minutes', price: '€85' },
        { name: 'Custom 2-3 minutes', price: '€105' },
        { name: 'Custom 3-4 minutes', price: '€130' },
        { name: 'Custom over 4 minutes', price: 'from €170' }
      ]
    },
    {
      title: 'JINGLES',
      services: [
        { name: 'Short Non-Exclusive Jingle', price: '€160', details: '(max 15 seconds)' },
        { name: 'Standard Non-Exclusive Jingle', price: '€250', details: '(max 40 seconds)' },
        { name: 'Corporate Exclusive Jingle', price: 'from €2000', details: '(All Rights)' },
        { name: 'TV & Radio Exclusive Jingle', price: 'from €3500', details: '(All Rights)' }
      ]
    },
    {
      title: 'SOUND DESIGN',
      services: [
        { name: 'Simple Sound Design', price: '€9/sound', details: '(Interface, Button, Alert)' },
        { name: 'Video Sound Design', price: '€70', details: '(max 1 minute)' },
        { name: 'Video Sound Design', price: '€85', details: '(2-5 minutes)' },
        { name: 'Video Game Project Pack', price: 'from €105' },
        { name: 'Film Project Pack', price: 'On quote' },
        { name: 'Animation Project Pack', price: 'On quote' }
      ]
    },
    {
      title: 'VOICEOVER',
      services: [
        { name: 'High Quality Voiceover', price: '€50', details: '(30 seconds)' },
        { name: 'High Quality Voiceover', price: '€80', details: '(1 minute)' },
        { name: 'High Quality Voiceover', price: '€100', details: '(2 minutes)' },
        { name: 'High Quality Voiceover', price: '€120', details: '(3 minutes)' },
        { name: 'National Advertising', price: 'from €130', details: '(Long Narration Project)' }
      ]
    },
    {
      title: 'MIXING & MASTERING',
      services: [
        { name: 'Single Track Mixing', price: '€50' },
        { name: 'Single Track Mastering', price: '€80' },
        { name: 'EP Mixing (4-6 tracks)', price: '€100' },
        { name: 'EP Mastering (4-6 tracks)', price: '€120' },
        { name: 'Album Project', price: 'from €130' }
      ]
    }
  ];

  scrollLeft() {
    this.cardsContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.cardsContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}
