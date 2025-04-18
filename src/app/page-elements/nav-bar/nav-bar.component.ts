import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  isScrolled = false;

  isMenuOpen = false;
  isMobile = window.innerWidth <= 768;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  constructor(public translate: TranslateService) {} // Notez le 'public' pour l'utiliser dans le template


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
