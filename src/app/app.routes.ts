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
      // La route vide '' pointera directement vers HomeComponent
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

    // Rediriger /home vers la racine
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      },


    // ABSOLUTE LAISSER EN DERNIER
    {
        path: '404',
        component: NotFoundPageComponent
      },
    {
      path: '**',
      redirectTo: '404'
    }
  ];