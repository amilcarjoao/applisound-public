import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
// AUTH
import { TokenStorageService } from '../../services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private languageService: LanguageService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
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

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(
      this.f['email'].value, 
      this.f['password'].value
    ).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error(err);
        this.loading = false;
        // Afficher un message d'erreur
      }
    });
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


  // AUTH SUITE
}