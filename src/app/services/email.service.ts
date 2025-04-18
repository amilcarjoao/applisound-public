import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  async sendDevisConfirmation(
    devisData: any, 
    pdfBlob: Blob, 
    transactionHash: string
  ): Promise<void> {
    const formData = new FormData();
    formData.append('devisId', devisData.id);
    formData.append('clientEmail', devisData.clientEmail);
    formData.append('clientName', devisData.clientName);
    formData.append('transactionHash', transactionHash);
    formData.append('devisPdf', pdfBlob, `devis_${devisData.id}.pdf`);

    await this.http.post(
      `${environment.apiUrl}/email/devis-confirmation`,
      formData
    ).toPromise();
  }

  async sendInternalNotification(devisData: any): Promise<void> {
    await this.http.post(
      `${environment.apiUrl}/email/internal-notification`,
      {
        devisId: devisData.id,
        clientName: devisData.clientName,
        services: devisData.items,
        total: devisData.total
      }
    ).toPromise();
  }
}