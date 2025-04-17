import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private router: Router) {}

    handleError(error: any): void {
      console.error('An error has occurred:', error);
      this.router.navigate(['/404']);

  }
}
