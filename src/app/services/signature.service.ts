// services/signature.service.ts
import { Injectable } from '@angular/core';
import SignaturePad from 'signature_pad';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  private signaturePad: SignaturePad;

  initializeSignaturePad(canvas: HTMLCanvasElement) {
    this.signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'white',
      velocityFilterWeight: 0.7,
      minWidth: 0.5,
      maxWidth: 2.5,
      throttle: 16
    });

    this.resizeCanvas(canvas);
    window.addEventListener('resize', () => this.resizeCanvas(canvas));
  }

  private resizeCanvas(canvas: HTMLCanvasElement) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    this.signaturePad.clear();
  }

  clear() {
    this.signaturePad.clear();
  }

  isEmpty(): boolean {
    return this.signaturePad.isEmpty();
  }

  async getSignatureImage(): Promise<string> {
    return this.signaturePad.toDataURL('image/png');
  }

  async saveSignature(devisId: string, clientAddress: string): Promise<void> {
    const signatureImage = await this.getSignatureImage();
    const timestamp = Date.now();
    
    // Créer un hash de la signature
    const signatureData = {
      devisId,
      clientAddress,
      timestamp,
      signatureImage
    };

    // Sauvegarder dans la blockchain et la base de données
    await this.saveToBlockchain(signatureData);
    await this.saveToDatabase(signatureData);
  }

  private async saveToBlockchain(signatureData: any) {
    // Implémenter la sauvegarde blockchain
  }

  private async saveToDatabase(signatureData: any) {
    // Implémenter la sauvegarde en base de données
  }
}
