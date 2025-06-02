import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ajout de l'import CommonModule

@Component({
  selector: 'app-form-step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-step-three.component.html',
  styleUrl: './form-step-three.component.scss',
})
export class FormStepThreeComponent implements OnInit {
  private signaturePad: any;
  hasSignature = false;
  isLoggedIn = false;

  constructor(private fb: FormBuilder) {
    this.previous = new EventEmitter<void>();
  }

  ngOnInit() {
    this.initializeSignaturePad();
    this.loadDevisContent();
    this.loadCGVContent();
  }
  loadCGVContent() {
    throw new Error('Method not implemented.');
  }
  loadDevisContent() {
    throw new Error('Method not implemented.');
  }

  private initializeSignaturePad() {
    const canvas = document.querySelector('canvas');
    // Initialisation du pad de signature
  }

  clearSignature() {
    this.signaturePad.clear();
    this.hasSignature = false;
  }

  // DECORATEUR COMME DANS ONE - 
  @Input() formData: any = {};


  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();
  @Output() complete = new EventEmitter<any>();

  async validateSignature() {
    if (this.hasSignature) {
      try {
        // 1. Générer le PDF du devis
        const devisPDF = await this.generateDevisPDF();

        // 2. Créer le smart contract
        const contract = await this.createSmartContract();

        // 3. Envoyer le mail de confirmation
        await this.sendConfirmationEmails();

        // 4. Rediriger vers la page de succès
        this.redirectToSuccess();

        // Émettre l'événement de complétion
        this.complete.emit({
          signature: this.signaturePad.toDataURL(),
          timestamp: new Date().toISOString(),

        
        });
      } catch (error) {
        console.error('Erreur lors de la validation:', error);
        // Gérer l'erreur
      }
    }
  }

  goToPreviousStep() {
    this.previous.emit();
  }

  redirectToSuccess() {
    throw new Error('Method not implemented.');
  }

  private async generateDevisPDF() {
    // Logique de génération du PDF
  }

  private async createSmartContract() {
    // Logique de création du smart contract
  }

  private async sendConfirmationEmails() {
    // Logique d'envoi des emails
  }

  saveDraftAndReturn() {
    // Sauvegarder l'état actuel
    // Rediriger vers la page principale
  }

  createAccount() {
    // Logique de création de compte
  }
}
