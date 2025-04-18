import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  async generateDevisPDF(devisData: any, signatureImage: string): Promise<Blob> {
    const documentDefinition: TDocumentDefinitions = {
      content: [
        {
          columns: [
            {
              image: 'data:image/png;base64,' + await this.getApplisoundLogo(),
              width: 150
            },
            {
              text: 'DEVIS',
              alignment: 'right',
              style: 'header'
            }
          ]
        },
        {
          text: `Devis N° ${devisData.id}`,
          style: 'subheader',
          margin: [0, 20, 0, 10]
        },
        {
          columns: [
            {
              text: 'Applisound\n123 rue de la Musique\n75000 Paris\nFrance',
              style: 'companyInfo'
            },
            {
              text: [
                { text: 'Client:\n', style: 'bold' },
                `${devisData.clientName}\n${devisData.clientAddress}\n${devisData.clientEmail}`
              ],
              alignment: 'right'
            }
          ],
          margin: [0, 20, 0, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Description', style: 'tableHeader' },
                { text: 'Quantité', style: 'tableHeader' },
                { text: 'Prix unitaire', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' }
              ],
              ...this.generateTableRows(devisData.items)
            ]
          }
        },
        {
          columns: [
            {},
            {
              stack: [
                { text: `Sous-total: ${devisData.subtotal} €`, alignment: 'right' },
                { text: `TVA (20%): ${devisData.tva} €`, alignment: 'right' },
                { text: `Total: ${devisData.total} €`, alignment: 'right', style: 'total' }
              ],
              width: 'auto',
              margin: [0, 20, 0, 20]
            }
          ]
        },
        {
          text: 'Conditions de paiement',
          style: 'subheader',
          margin: [0, 20, 0, 10]
        },
        {
          text: devisData.paymentTerms
        },
        {
          columns: [
            {
              text: 'Signature du client:',
              margin: [0, 40, 0, 20]
            },
            {
              image: signatureImage,
              width: 200,
              margin: [0, 20, 0, 20]
            }
          ]
        },
        {
          text: `Date: ${new Date().toLocaleDateString()}`,
          margin: [0, 20, 0, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fillColor: '#f8f9fa'
        },
        total: {
          fontSize: 16,
          bold: true
        },
        companyInfo: {
          color: '#666666'
        }
      },
      defaultStyle: {
        fontSize: 12
      }
    };

    return pdfMake.createPdf(documentDefinition).getBlob();
  }

  private generateTableRows(items: any[]): any[][] {
    return items.map(item => [
      item.description,
      item.quantity,
      `${item.unitPrice} €`,
      `${item.total} €`
    ]);
  }

  private async getApplisoundLogo(): Promise<string> {
    // Retourner le logo en base64
    return '';
  }
}