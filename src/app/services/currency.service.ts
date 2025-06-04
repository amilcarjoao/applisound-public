import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type CurrencyCode = 'EUR' | 'USD' | 'CHF' | 'JPY';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Taux de conversion par rapport à l'EUR
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies: Record<CurrencyCode, CurrencyInfo> = {
    'EUR': { code: 'EUR', symbol: '€', rate: 1 },
    'USD': { code: 'USD', symbol: '$', rate: 1.09 }, // Taux approximatif
    'CHF': { code: 'CHF', symbol: 'CHF', rate: 0.96 }, // Taux approximatif
    'JPY': { code: 'JPY', symbol: '¥', rate: 160 } // Taux approximatif
  };

  private currentCurrencySubject = new BehaviorSubject<CurrencyInfo>(this.currencies['EUR']);
  currentCurrency$ = this.currentCurrencySubject.asObservable();

  // Mapping des langues aux devises
  private languageCurrencyMap: Record<string, CurrencyCode> = {
    'en': 'USD',
    'fr': 'EUR',
    'de': 'EUR',
    'es': 'EUR',
    'it': 'EUR',
    'ch-fr': 'CHF',
    'ch-de': 'CHF',
    'jp': 'JPY'
  };

  constructor(private translate: TranslateService) {
    // Définir la devise en fonction de la langue actuelle
    this.setCurrencyByLanguage(translate.currentLang);
    
    // S'abonner aux changements de langue
    translate.onLangChange.subscribe(event => {
      this.setCurrencyByLanguage(event.lang);
    });
  }

  setCurrencyByLanguage(lang: string) {
    const currencyCode = this.languageCurrencyMap[lang] || 'EUR';
    this.setCurrentCurrency(currencyCode);
  }

  setCurrentCurrency(code: CurrencyCode) {
    this.currentCurrencySubject.next(this.currencies[code]);
  }

  convertPrice(priceInEUR: number): string {
    const currency = this.currentCurrencySubject.value;
    const convertedPrice = priceInEUR * currency.rate;
    return `${currency.symbol}${convertedPrice.toFixed(0)}`;
  }

  // Convertit une chaîne de prix (ex: "€299") en valeur numérique
  extractPriceValue(priceString: string): number {
    // Supprimer tous les caractères non numériques sauf le point décimal
    const numericString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  }

  // Convertit une chaîne de prix avec le symbole de devise actuel
  formatPrice(priceString: string): string {
    if (priceString.includes('from')) {
      const price = this.extractPriceValue(priceString);
      return `${this.translate.instant('PRICING.PRICE_FROM')} ${this.convertPrice(price)}`;
    }
    
    const price = this.extractPriceValue(priceString);
    return this.convertPrice(price);
  }
}
