import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-not-found',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class NotFoundPageComponent {

  constructor(private router: Router) {}

  retourAccueil(): void {
    this.router.navigate(['/']);
  }

}
