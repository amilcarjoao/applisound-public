// src/app/services/form-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();
  
  private apiUrl = 'http://localhost:8081/api/forms';

  constructor(private http: HttpClient) {}

  updateFormData(data: any) {
    const currentData = this.formDataSubject.value;
    const updatedData = { ...currentData, ...data };
    this.formDataSubject.next(updatedData);
    return updatedData;
  }

  getFormData(): any {
    return this.formDataSubject.value;
  }

  saveFormData(): Observable<any> {
    return this.http.post(this.apiUrl, this.formDataSubject.value);
  }

  getFormById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
