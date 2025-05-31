import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-login-space',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login-space.component.html',
  styleUrl: './login-space.component.scss'
})
export class LoginSpaceComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  // Getter pour un accès facile aux champs du formulaire
  get f(): any { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulation d'une requête d'authentification
    setTimeout(() => {
      // Ici, vous implémenteriez l'appel à votre service d'authentification
      console.log('Tentative de connexion avec:', this.loginForm.value);
      this.loading = false;
    }, 1500);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Générer l'URL correcte en fonction de la langue (comme dans nav-bar)
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