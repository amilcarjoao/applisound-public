import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FormStep = 'one' | 'two' | 'three' | 'none';

@Injectable({
  providedIn: 'root'
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
    if (this.formCompletedSubject.value || this.currentStepSubject.value === 'one') {
      this.currentStepSubject.next('none');
      document.body.classList.remove('modal-open');
    } else {
      // Afficher une confirmation si le formulaire n'est pas terminé
      if (confirm('Êtes-vous sûr de vouloir quitter ? Vos données ne seront pas sauvegardées.')) {
        this.currentStepSubject.next('none');
        document.body.classList.remove('modal-open');
      }
    }
  }

  completeForm() {
    this.formCompletedSubject.next(true);
  }


  nextStep(currentStep: FormStep, formData: any) {
    this.formDataSubject.next({...this.formDataSubject.value, ...formData});

    if (currentStep === 'one') {
      this.currentStepSubject.next('two');
    } else if (currentStep === 'two') {
      this.currentStepSubject.next('three');
    }
  }

  previousStep(currentStep: FormStep) {
    if (currentStep === 'three') {
      this.currentStepSubject.next('two');
    } else if (currentStep === 'two') {
      this.currentStepSubject.next('one');
    }
  }

  getFormData() {
    return this.formDataSubject.value;
  }
}
