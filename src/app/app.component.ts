import { Component, OnInit, HostBinding } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FooterComponent } from "./page-elements/footer/footer.component";
import { NavBarComponent } from './page-elements/nav-bar/nav-bar.component';
import { routeAnimations } from './route-animations';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { FormModalComponent } from './modal/form-modal/form-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavBarComponent,
    TranslateModule,
    FormModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isDashboardRoute: boolean = false;
  
  // Variable pour suivre l'état d'animation
  @HostBinding('class.route-animating') routeAnimating = false;
  
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {

    // Créez un layout spécifique pour les pages privées qui n'inclut pas la navbar et le footer.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Vérifier si la route actuelle commence par /dashboard
      this.isDashboardRoute = event.url.startsWith('/dashboard');
    });
  }

  ngOnInit() {
    // Gérer les changements de route pour les animations
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
      }
    });
  }

  // Fonction pour préparer les animations de route
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }



}