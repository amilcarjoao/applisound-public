import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}
  
  switchLang(event: Event) {
    const select = event.target as HTMLSelectElement;
    const language = select.value;
    
    // Mettre à jour la langue active
    this.translate.use(language);
    
    // Sauvegarder la langue préférée
    localStorage.setItem('preferredLanguage', language);
    
    // Mettre à jour l'URL avec le préfixe de langue
    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${language}/${currentUrl}`]);
  }
}