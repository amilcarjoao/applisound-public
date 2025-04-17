import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./page-elements/footer/footer.component";
import { NavBarComponent } from './page-elements/nav-bar/nav-bar.component';
import { PlayerSoundtracksComponent } from "./widgets/player-soundtracks/player-soundtracks.component";
import { routeAnimations } from './route-animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavBarComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations]
})
export class AppComponent {

  title = 'applisound-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }

  
}
