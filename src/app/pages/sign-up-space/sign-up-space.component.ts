import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-sign-up-space',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './sign-up-space.component.html',
  styleUrl: './sign-up-space.component.scss'
})
export class SignUpSpaceComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matching: true });
      return { matching: true };
    }
    
    return null;
  }

  // Getter pour un accès facile aux champs du formulaire
  get f(): any { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulation d'une requête d'inscription
    setTimeout(() => {
      // Ici, vous implémenteriez l'appel à votre service d'inscription
      console.log('Tentative d\'inscription avec:', this.signupForm.value);
      this.loading = false;
    }, 1500);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
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