// services/devis.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  constructor(private http: HttpClient) {}

  generateDevis(formData: any): Observable<any> {
    // Logique de génération du devis
    return this.http.post('/api/devis/generate', formData);
  }

  saveSignature(signatureData: string, devisId: string): Observable<any> {
    return this.http.post('/api/devis/signature', { signatureData, devisId });
  }

  createSmartContract(devisData: any): Observable<any> {
    return this.http.post('/api/blockchain/create-contract', devisData);
  }
}

// services/email.service.ts
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendConfirmationEmails(devisId: string): Observable<any> {
    return this.http.post('/api/email/send-confirmation', { devisId });
  }
}
