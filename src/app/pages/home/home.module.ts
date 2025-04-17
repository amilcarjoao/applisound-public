import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

// Revoir après
// import { HomeRoutingModule } from './home-routing.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  
  declarations: [], // J'ai supprimé HomeComponent, je le remettrais plus tard
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HomeComponent
  ]
  
})

export class HomeModule { }
