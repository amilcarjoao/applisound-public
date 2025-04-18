import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { VoiceoverPageComponent } from './pages/voiceover-page/voiceover-page.component';
import { ProducsoundsPageComponent } from './pages/producsounds-page/producsounds-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { EnterprisePageComponent } from './pages/enterprise-page/enterprise-page.component';
import { HowItWorksPageComponent } from './pages/how-it-works-page/how-it-works-page.component';
import { LoginSpaceComponent } from './pages/login-space/login-space.component';
import { SignUpSpaceComponent } from './pages/sign-up-space/sign-up-space.component';

export const routes: Routes = [
  // Redirection racine vers la langue par défaut
  { 
    path: '', 
    redirectTo: '/en', 
    pathMatch: 'full' 
  },
  
  // Routes principales avec paramètre de langue
  {
    path: ':lang',
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { animation: 'HomePage' }
      },
      {
        path: 'music',
        component: MusicPageComponent,
        data: { animation: 'MusicPage' }
      },
      {
        path: 'voiceover',
        component: VoiceoverPageComponent,
        data: { animation: 'VoiceoverPage'}
      },
      {
        path: 'producsounds',
        component: ProducsoundsPageComponent,
        data: { animation: 'Producsounds'}
      },
      {
        path: 'pricing',
        component: PricingPageComponent,
        data: { animation: 'PricingPage'}
      },
      {
        path: 'enterprise',
        component: EnterprisePageComponent,
        data: { animation: 'EnterprisePage'}
      },
      {
        path: 'how-it-works',
        component: HowItWorksPageComponent,
        data: { animation: 'HowItWorksPage'}
      },
      {
        path: 'login',
        component: LoginSpaceComponent,
        data: { animation: 'LoginSpace'}
      },
      {
        path: 'signup',
        component: SignUpSpaceComponent,
        data: { animation: 'SignUpSpace'}
      },
      // Page 404 dans le contexte de la langue
      {
        path: '404',
        component: NotFoundPageComponent
      },
      // Redirection des routes inconnues vers 404 dans le contexte de la langue
      // {
      //   path: '**',
      //   redirectTo: '404'
      // }
    ]
  },

  // Redirection des anciennes URLs vers les nouvelles avec langue
  {
    path: 'home',
    redirectTo: '/en',
    pathMatch: 'full'
  },
  {
    path: 'music',
    redirectTo: '/en/music',
    pathMatch: 'full'
  },
  {
    path: 'voiceover',
    redirectTo: '/en/voiceover',
    pathMatch: 'full'
  },
  {
    path: 'producsounds',
    redirectTo: '/en/producsounds',
    pathMatch: 'full'
  },
  {
    path: 'pricing',
    redirectTo: '/en/pricing',
    pathMatch: 'full'
  },
  {
    path: 'enterprise',
    redirectTo: '/en/enterprise',
    pathMatch: 'full'
  },
  {
    path: 'how-it-works',
    redirectTo: '/en/how-it-works',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: '/en/login',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    redirectTo: '/en/signup',
    pathMatch: 'full'
  },

  // Redirection finale pour toutes les autres routes inconnues
  {
    path: '**',
    redirectTo: '/en'
  }
  
];
