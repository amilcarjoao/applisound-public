// src/app/pages/pricing-page/pricing-page.component.ts
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CurrencyService, CurrencyCode } from '../../services/currency.service';


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
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent implements OnInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  pricingCards: PricingCard[] = [
    {
      title: 'PRICING.SOUNDTRACKS_TITLE',
      services: [
        { name: 'PRICING.STANDARD_TRACK', price: '€70', details: 'PRICING.UP_TO_30_SEC' },
        { name: 'PRICING.CUSTOM_TRACK', price: '€85', details: 'PRICING.UP_TO_2_MIN' },
        { name: 'PRICING.CUSTOM_TRACK', price: '€105', details: 'PRICING.UP_TO_5_MIN' },
        { name: 'PRICING.PREMIUM_TRACK', price: '€130', details: 'PRICING.PROFESSIONAL' },
        { name: 'PRICING.PREMIUM_TRACK', price: 'from €170', details: 'PRICING.WITH_ORCHESTRA' }
      ]
    },
    {
      title: 'PRICING.JINGLES_TITLE',
      services: [
        { name: 'PRICING.SHORT_FORMAT', price: '€160', details: 'PRICING.UP_TO_30_SEC' },
        { name: 'PRICING.MEDIUM_FORMAT', price: '€250', details: 'PRICING.UP_TO_2_MIN' },
        { name: 'PRICING.CORPORATE_HYMN', price: 'from €2000', details: 'PRICING.WITH_LYRICS' },
        { name: 'PRICING.ORGANIZATION_HYMN', price: 'from €3500', details: 'PRICING.WITH_ORCHESTRA' }
      ]
    },
    {
      title: 'PRICING.SOUND_DESIGN_TITLE',
      services: [
        { name: 'PRICING.SOUND_EFFECTS', price: '€9', details: 'PRICING.PROFESSIONAL' },
        { name: 'PRICING.AMBIENT_SOUNDS', price: '€70', details: 'PRICING.UP_TO_30_SEC' },
        { name: 'PRICING.AMBIENT_SOUNDS', price: '€85', details: 'PRICING.UP_TO_2_MIN' },
        { name: 'PRICING.PACK_OF_10', price: '€105', details: 'PRICING.SOUND_EFFECTS' },
        { name: 'PRICING.CUSTOM_PACK', price: 'from €299', details: 'PRICING.PROFESSIONAL' }
      ]
    },
    {
      title: 'PRICING.VOICEOVER_TITLE',
      services: [
        { name: 'PRICING.MALE_VOICE', price: '€50', details: 'PRICING.UP_TO_30_SEC' },
        { name: 'PRICING.FEMALE_VOICE', price: '€80', details: 'PRICING.UP_TO_2_MIN' },
        { name: 'PRICING.MALE_VOICE', price: '€100', details: 'PRICING.NATIVE_SPEAKER' },
        { name: 'PRICING.FEMALE_VOICE', price: '€120', details: 'PRICING.NATIVE_SPEAKER' },
        { name: 'PRICING.PROFESSIONAL', price: 'from €130', details: 'PRICING.UP_TO_5_MIN' }
      ]
    },
    {
      title: 'PRICING.HYMNS_TITLE',
      services: [
        { name: 'PRICING.SHORT_FORMAT', price: '€299', details: 'PRICING.UP_TO_2_MIN' },
        { name: 'PRICING.MEDIUM_FORMAT', price: '€499', details: 'PRICING.UP_TO_5_MIN' },
        { name: 'PRICING.CORPORATE_HYMN', price: '€999', details: 'PRICING.WITH_LYRICS' },
        { name: 'PRICING.ORGANIZATION_HYMN', price: 'from €1499', details: 'PRICING.WITH_ORCHESTRA' }
      ]
    }
  ];

  currentCurrency: string = '€';
  isDropdownOpen: boolean = false;

  constructor(
    private translate: TranslateService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit() {
    // S'abonner aux changements de devise
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.currentCurrency = currency.symbol;
    });
    
    // Fermer le dropdown quand on clique ailleurs sur la page
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.currency-dropdown')) {
        this.isDropdownOpen = false;
      }
    });
  }

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

  formatPrice(price: string): string {
    return this.currencyService.formatPrice(price);
  }
  
  toggleCurrencyDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  selectCurrency(currency: string) {

    // Vérifier que la valeur est valide avant de la convertir
  if (currency === 'EUR' || currency === 'USD' || currency === 'CHF' || currency === 'JPY') {
    this.currencyService.setCurrentCurrency(currency as CurrencyCode);
  }
  this.isDropdownOpen = false;
  }
  
  getCurrentCurrencyLabel(): string {
    switch(this.currentCurrency) {
      case '€': return 'EUR (€)';
      case '$': return 'USD ($)';
      case 'CHF': return 'CHF';
      case '¥': return 'JPY (¥)';
      default: return 'EUR (€)';
    }
  }
}