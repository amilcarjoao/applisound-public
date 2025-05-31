// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate(): boolean {
  // Temporairement retourner true pour le développement
  return true;
  
  // Code à utiliser plus tard avec l'authentification réelle
  // const isAuthenticated = localStorage.getItem('auth_token') !== null;
  // if (!isAuthenticated) {
  //   this.router.navigate(['/login']);
  //   return false;
  // }
  // return true;
}
}
