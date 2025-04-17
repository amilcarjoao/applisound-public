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
        component: HomeComponent
      },
      {
        path: 'music',
        component: MusicPageComponent,
        data: { animation: 'music' }
      },
      {
        path: 'voiceover',
        component: VoiceoverPageComponent
      },
      {
        path: 'producsounds',
        component: ProducsoundsPageComponent
      },
      {
        path: 'pricing',
        component: PricingPageComponent
      },
      {
        path: 'enterprise',
        component: EnterprisePageComponent
      },
      {
        path: 'how-it-works',
        component: HowItWorksPageComponent
      },
      {
        path: 'enterprise',
        component: LoginSpaceComponent
      },
      {
        path: 'how-it-works',
        component: SignUpSpaceComponent
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