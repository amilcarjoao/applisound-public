import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Liste des langues supportées
  supportedLanguages = ['en', 'fr', 'cn', 'de', 'es', 'it', 'jp', 'kr', 'nl', 'no', 'pl', 'pt', 'se', 'ch-fr', 'ch-de', 'ar'];
  
  // Langues RTL
  rtlLanguages = ['ar'];
  
  // Observable pour la langue actuelle
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Initialiser les langues
    this.initLanguages();
    
    // Écouter les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateLanguageFromUrl();
    });
  }

  // Initialiser les langues
  private initLanguages() {
    // Configurer les langues supportées
    this.translate.addLangs(this.supportedLanguages);
    this.translate.setDefaultLang('en');
    
    // Récupérer la langue sauvegardée
    const savedLang = localStorage.getItem('preferredLanguage');
    
    // Détection automatique de la langue du navigateur
    const browserLang = this.translate.getBrowserLang();
    const detectedLang = browserLang && this.supportedLanguages.includes(browserLang) ? browserLang : 'en';
    
    // Utiliser la langue sauvegardée ou détectée
    const userLang = savedLang || detectedLang;
    
    // Appliquer la langue
    this.setLanguage(userLang, false);
  }

  // Mettre à jour la langue à partir de l'URL
  private updateLanguageFromUrl() {
    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1) {
      const possibleLang = urlSegments[1];
      
      // Si c'est une langue supportée (sauf anglais qui est la langue par défaut)
      if (possibleLang && this.supportedLanguages.includes(possibleLang)) {
        this.setLanguage(possibleLang, false);
      } else {
        // Si pas de langue dans l'URL, utiliser l'anglais
        this.setLanguage('en', false);
      }
    } else {
      // URL racine, utiliser l'anglais
      this.setLanguage('en', false);
    }
  }

  // Définir la langue
  setLanguage(lang: string, updateUrl: boolean = true) {
    // Mettre à jour la langue
    this.translate.use(lang);
    this.currentLanguageSubject.next(lang);
    
    // Sauvegarder la langue préférée
    localStorage.setItem('preferredLanguage', lang);
    
    // Mettre à jour la direction du document pour les langues RTL
    const dir = this.rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    this.document.documentElement.setAttribute('dir', dir);
    
    // Mettre à jour l'URL si nécessaire
    if (updateUrl) {
      this.updateUrlWithLanguage(lang);
    }
  }

  // Obtenir la langue actuelle
  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  // Mettre à jour l'URL avec la langue
  private updateUrlWithLanguage(lang: string) {
    // Récupérer le chemin actuel sans le préfixe de langue
    let currentPath = this.router.url.split('/').slice(1);
    const firstSegment = currentPath[0];
    
    // Vérifier si l'URL actuelle commence par un code de langue
    const isCurrentLangPath = this.supportedLanguages.includes(firstSegment);
    
    // Si c'est le cas, retirer le préfixe de langue
    if (isCurrentLangPath) {
      currentPath = currentPath.slice(1);
    }
    
    // Si le chemin est vide, naviguer vers la page d'accueil
    if (currentPath.length === 0 || (currentPath.length === 1 && currentPath[0] === '')) {
      if (lang === 'en') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/', lang]);
      }
      return;
    }
    
    // Construire la nouvelle URL
    if (lang === 'en') {
      // Pour l'anglais, pas de préfixe
      this.router.navigate(['/', ...currentPath]);
    } else {
      // Pour les autres langues, ajouter le préfixe
      this.router.navigate(['/', lang, ...currentPath]);
    }
  }
}