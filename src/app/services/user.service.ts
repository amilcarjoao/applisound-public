// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8081/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.tokenStorage.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  updateCurrentUser(user: any) {
    this.tokenStorage.saveUser(user);
    this.currentUserSubject.next(user);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(API_URL + 'profile');
  }

  updateUserProfile(user: any): Observable<any> {
    return this.http.put(API_URL + 'profile', user);
  }
}
