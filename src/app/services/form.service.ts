// src/app/services/form.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormModalService } from './form-modal.service';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formModalService: FormModalService
  ) {}

  openOrderForm(serviceType?: string) {
    // Stocker le type de service dans le localStorage
    if (serviceType) {
      localStorage.setItem('selectedServiceType', serviceType);
    }

    // Ouvrir la modale du formulaire
    this.formModalService.openForm(serviceType || '');

    // Naviguer vers la première étape du formulaire | 
    //this.router.navigate(['/form/step-one']); // SUPPRIME POUR EVITER CHANGER DE ROUTE
  }

  }
