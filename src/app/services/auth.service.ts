// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username: email, // Utilisez l'email comme nom d'utilisateur
        password,
      },
      httpOptions
    );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstName,
        lastName,
        username: email, // Utilisez l'email comme nom d'utilisateur
        email,
        password,
      },
      httpOptions
    );
  }
}
