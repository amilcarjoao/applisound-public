import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FormStep = 'one' | 'two' | 'three' | 'none';

@Injectable({
  providedIn: 'root',
})
export class FormModalService {
  private currentStepSubject = new BehaviorSubject<FormStep>('none');
  currentStep$ = this.currentStepSubject.asObservable();

  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();

  private serviceTypeSubject = new BehaviorSubject<string>('');
  serviceType$ = this.serviceTypeSubject.asObservable();

  private formCompletedSubject = new BehaviorSubject<boolean>(false);
  formCompleted$ = this.formCompletedSubject.asObservable();

  constructor() {}

  openForm(serviceType: string) {
    this.serviceTypeSubject.next(serviceType);
    this.currentStepSubject.next('one');
    this.formCompletedSubject.next(false);
    document.body.classList.add('modal-open');
  }

  closeForm() {
    // Vérifier si le formulaire est terminé ou si l'utilisateur est sur la première étape
    if (
      this.formCompletedSubject.value ||
      this.currentStepSubject.value === 'one'
    ) {
      this.currentStepSubject.next('none');
      document.body.classList.remove('modal-open');
    } else {
      // Au lieu d'utiliser confirm(), émettre un état de confirmation
      this.showConfirmationSubject.next(true);
    }
  }

  // Ajouter ces propriétés et méthodes
  private showConfirmationSubject = new BehaviorSubject<boolean>(false);
  showConfirmation$ = this.showConfirmationSubject.asObservable();

  confirmClose() {
    this.showConfirmationSubject.next(false);
    this.currentStepSubject.next('none');
    document.body.classList.remove('modal-open');
  }

  cancelClose() {
    this.showConfirmationSubject.next(false);
  }

  completeForm() {
    this.formCompletedSubject.next(true);
  }

  nextStep(currentStep: FormStep, formData: any) {
    this.formDataSubject.next({ ...this.formDataSubject.value, ...formData });

    if (currentStep === 'one') {
      this.currentStepSubject.next('two');
    } else if (currentStep === 'two') {
      this.currentStepSubject.next('three');
    }
  }

  previousStep(currentStep: FormStep) {
    if (currentStep === 'three') {
      // Force Angular change detection cycle
      this.currentStepSubject.next('none');
      setTimeout(() => {
        this.currentStepSubject.next('two');
      }, 10);
    } else if (currentStep === 'two') {
      // Force Angular change detection cycle
      this.currentStepSubject.next('none');
      setTimeout(() => {
        this.currentStepSubject.next('one');
      }, 10);
    }
  }

  getFormData() {
    return this.formDataSubject.value;
  }
}
