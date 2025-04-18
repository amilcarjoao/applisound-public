import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-step-three',
  standalone: true,
  imports: [],
  templateUrl: './form-step-three.component.html',
  styleUrl: './form-step-three.component.scss'
})

export class FormStepThreeComponent implements OnInit {
  constructor(
    private blockchainService: BlockchainService,
    private signatureService: SignatureService,
    private devisService: DevisService,
    private emailService: EmailService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async validateAndSign() {
    try {
      // 1. Vérifier la signature
      if (this.signatureService.isEmpty()) {
        throw new Error('Signature requise');
      }

      // 2. Connecter le wallet
      const clientAddress = await this.blockchainService.connectWallet();

      // 3. Créer le contrat sur la blockchain
      const devisData = await this.devisService.generateDevis(this.formData);
      const transactionHash = await this.blockchainService.createDevisContract(devisData);

      // 4. Sauvegarder la signature
      await this.signatureService.saveSignature(devisData.id, clientAddress);

      // 5. Envoyer les emails de confirmation
      await this.emailService.sendConfirmationEmails(devisData.id);

      // 6. Rediriger vers la page de succès
      this.router.navigate(['/success'], { 
        queryParams: { 
          devisId: devisData.id,
          transactionHash 
        }
      });

    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      // Gérer l'erreur et afficher un message à l'utilisateur
    }
  }
}
