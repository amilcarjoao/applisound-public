import { Component, HostListener, OnInit, Renderer2, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, AfterViewInit {

  isScrolled = false;
  isMenuOpen = false;
  isMobile = window.innerWidth <= 767;
  
  // Variables pour l'indicateur
  indicatorPosition = 0;
  indicatorWidth = 0;
  hasActiveLink = false;
  
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;

  constructor(
    public translate: TranslateService,
    private renderer: Renderer2,
    private router: Router,
    public languageService: LanguageService
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.updateBodyScroll();
    
    // Écouter les changements de route pour mettre à jour l'indicateur
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => this.updateIndicator(), 100);
    });
  }
  
  ngAfterViewInit() {
    // Mettre à jour l'indicateur après le rendu initial
    setTimeout(() => this.updateIndicator(), 200);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
    if (!this.isMobile) {
      setTimeout(() => this.updateIndicator(), 100);
    }
  }

  checkScreenSize() {
    const wasAlreadyMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 767;
    
    // Si on passe de mobile à desktop, fermer le menu
    if (wasAlreadyMobile && !this.isMobile) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenuIfMobile() {
    if (this.isMobile) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  // Empêcher le défilement du body quand le menu mobile est ouvert
  private updateBodyScroll() {
    if (this.isMenuOpen) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
  
  // Mettre à jour la position et la largeur de l'indicateur
  updateIndicator() {
    if (this.isMobile) return;
    
    const activeLink = this.navLinks.find(link => 
      link.nativeElement.classList.contains('active')
    );
    
    if (activeLink) {
      const linkElement = activeLink.nativeElement;
      const rect = linkElement.getBoundingClientRect();
      const navRect = linkElement.parentElement.getBoundingClientRect();
      
      // Calculer la position relative par rapport au conteneur de navigation
      this.indicatorPosition = rect.left - navRect.left;
      this.indicatorWidth = rect.width;
      this.hasActiveLink = true;
    } else {
      // Aucun lien actif, masquer l'indicateur
      this.hasActiveLink = false;
    }
  }
  
  // Générer l'URL correcte en fonction de la langue
  getRouterLink(path: string): any[] {
    const currentLang = this.languageService.getCurrentLanguage();
    
    // Pour la page d'accueil
    if (path === '') {
      return currentLang === 'en' ? ['/'] : ['/', currentLang];
    }
    
    // Pour les autres pages
    return currentLang === 'en' ? ['/', path] : ['/', currentLang, path];
  }
}