import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';

const routes: Routes = [


  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  },

  // TRADUCTION

  {
    path: ':lang',
    children: [
      { path: '', component: HomeComponent },
      { path: 'pricing', component: PricingPageComponent },
      // autres routes...
    ]
  },

  { path: '', redirectTo: '/en', pathMatch: 'full' },
  { path: '**', redirectTo: '/en' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
