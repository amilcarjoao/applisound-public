import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./page-elements/footer/footer.component";
import { NavBarComponent } from './page-elements/nav-bar/nav-bar.component';
import { PlayerSoundtracksComponent } from "./widgets/player-soundtracks/player-soundtracks.component";
import { routeAnimations } from './route-animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavBarComponent,
    TranslateModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    // Langues supportées
    translate.addLangs(['en', 'fr']);

    // Récupérer la langue sauvegardée ou utiliser celle du navigateur
    const savedLang = localStorage.getItem('preferredLanguage');
    
    
    // Langue par défaut
    translate.setDefaultLang('en');
    // translate.use(defaultLang);
    
    // Détection automatique de la langue du navigateur
    const browserLang = translate.getBrowserLang();
    const lang = browserLang?.match(/en|fr/) ? browserLang : 'en';
    const defaultLang = savedLang || (browserLang?.match(/en|fr/) ? browserLang : 'en');

    
    // Applique la langue et met à jour l'URL
    this.switchLang(lang);
  }

  

  ngOnInit() {
    // Gérer les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlSegments = this.router.url.split('/');
      if (urlSegments.length > 1) {
        const langInUrl = urlSegments[1];
        if (langInUrl.match(/en|fr/)) {
          // Sauvegarder la langue préférée
          localStorage.setItem('preferredLanguage', langInUrl);
          this.translate.use(langInUrl);
        }
      }
    });
  }

  switchLang(lang: string | Event) {
    const language = typeof lang === 'string' ? lang : (lang.target as HTMLSelectElement).value;
    this.translate.use(language);
    
    // Met à jour l'URL avec le préfixe de langue
    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${language}/${currentUrl}`]);
  }



  // title = 'applisound-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }

  
}
