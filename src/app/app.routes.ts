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
  // Routes principales sans préfixe de langue (anglais par défaut)
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
  {
    path: '404',
    component: NotFoundPageComponent
  },
  
  // Routes avec préfixe de langue (toutes les langues sauf anglais)
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
      {
        path: '404',
        component: NotFoundPageComponent
      }
    ]
  },

  // Redirection pour /en vers la racine (pour supprimer le préfixe /en)
  {
    path: 'en',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'en/music',
    redirectTo: 'music',
    pathMatch: 'full'
  },
  {
    path: 'en/voiceover',
    redirectTo: 'voiceover',
    pathMatch: 'full'
  },
  {
    path: 'en/producsounds',
    redirectTo: 'producsounds',
    pathMatch: 'full'
  },
  {
    path: 'en/pricing',
    redirectTo: 'pricing',
    pathMatch: 'full'
  },
  {
    path: 'en/enterprise',
    redirectTo: 'enterprise',
    pathMatch: 'full'
  },
  {
    path: 'en/how-it-works',
    redirectTo: 'how-it-works',
    pathMatch: 'full'
  },
  {
    path: 'en/login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'en/signup',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'en/404',
    redirectTo: '404',
    pathMatch: 'full'
  },

  // Redirection finale pour toutes les autres routes inconnues
  {
    path: '**',
    redirectTo: '/404'
  }
];