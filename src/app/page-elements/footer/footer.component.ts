import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentLanguage: string = 'en';

  constructor(public languageService: LanguageService) {}

  ngOnInit() {
    // S'abonner aux changements de langue
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  switchLang(event: Event) {
  const select = event.target as HTMLSelectElement;
  const language = select.value;
  
  // Si on est à la racine et qu'on choisit une langue autre que l'anglais
  if (language !== 'en' && window.location.pathname === '/') {
    // Redirection avec la langue dans l'URL pour forcer un rafraîchissement complet
    window.location.href = `/${language}`;
    return;
  }
  
  // Si on est sur une page avec une langue et qu'on choisit l'anglais
  if (language === 'en' && window.location.pathname.match(/^\/[a-z]{2}(-[a-z]{2})?$/)) {
    // Redirection vers la racine pour forcer un rafraîchissement complet
    window.location.href = '/';
    return;
  }
  
  // Dans les autres cas, utiliser le service de langue standard
  this.languageService.setLanguage(language);
}
}
