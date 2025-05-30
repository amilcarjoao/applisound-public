import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentLanguage: string = 'en';
  
  constructor(
    public languageService: LanguageService
  ) {}
  
  ngOnInit() {
    // S'abonner aux changements de langue
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }
  
  switchLang(event: Event) {
    const select = event.target as HTMLSelectElement;
    const language = select.value;
    
    // Utiliser le service de langue pour changer la langue
    this.languageService.setLanguage(language);
  }
}