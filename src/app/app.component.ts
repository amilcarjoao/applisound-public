import { Component, OnInit, HostBinding } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FooterComponent } from "./page-elements/footer/footer.component";
import { NavBarComponent } from './page-elements/nav-bar/nav-bar.component';
import { routeAnimations } from './route-animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
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
  
  // Variable pour suivre l'état d'animation
  @HostBinding('class.route-animating') routeAnimating = false;
  
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    // Langues supportées
    translate.addLangs(['en', 'fr', 'cn', 'de', 'es', 'it', 'jp', 'nl', 'no', 'pl', 'pt', 'se', 'ch-fr', 'ch-de', 'ar']);

    // Récupérer la langue sauvegardée ou utiliser celle du navigateur
    const savedLang = localStorage.getItem('preferredLanguage');
    
    // Langue par défaut
    translate.setDefaultLang('en');
    
    // Détection automatique de la langue du navigateur
    const browserLang = translate.getBrowserLang();
    const lang = browserLang?.match(/en|fr|cn|de|es|it|jp|nl|no|pl|pt|se|ch-fr|ch-de|ar/) ? browserLang : 'en';
    const defaultLang = savedLang || (browserLang?.match(/en|fr|cn|de|es|it|jp|nl|no|pl|pt|se|ch-fr|ch-de|ar/) ? browserLang : 'en');
    
    // Applique la langue
    translate.use(defaultLang || lang);
    
    // Redirection vers la bonne URL avec la langue
    if (this.router.url === '/' || this.router.url === '') {
      this.router.navigate([`/${defaultLang || lang}`]);
    }
  }

  ngOnInit() {
    // Gérer les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationStart)
    ).subscribe(event => {
      // Mettre à jour la classe d'animation
      if (event instanceof NavigationStart) {
        this.routeAnimating = true;
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.routeAnimating = false;
        }, 1000); // Durée totale de l'animation + marge
        
        const urlSegments = this.router.url.split('/');
        if (urlSegments.length > 1) {
          const langInUrl = urlSegments[1];
          if (langInUrl.match(/en|fr|cn|de|es|it|jp|nl|no|pl|pt|se|ch-fr|ch-de|ar/)) {
            // Sauvegarder la langue préférée
            localStorage.setItem('preferredLanguage', langInUrl);
            this.translate.use(langInUrl);
          }
        }
      }
    });
  }

  // Fonction pour préparer les animations de route
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }
}