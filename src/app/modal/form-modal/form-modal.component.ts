// src/app/components/form-modal/form-modal.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalService, FormStep } from '../../services/form-modal.service';
import { FormStepOneComponent } from '../../form-step-one/form-step-one.component';
import { FormStepTwoComponent } from '../../form-step-two/form-step-two.component';
import { FormStepThreeComponent } from '../../form-step-three/form-step-three.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, FormStepOneComponent, FormStepTwoComponent, FormStepThreeComponent],
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit, OnDestroy {
  currentStep: FormStep = 'none';
  serviceType: string = '';
  formData: any = {};

  
  private subscription = new Subscription();
  
  constructor(private formModalService: FormModalService) {}
  
  ngOnInit() {
    this.subscription.add(
      this.formModalService.currentStep$.subscribe(step => {
        this.currentStep = step;
      })
    );
    
    this.subscription.add(
      this.formModalService.serviceType$.subscribe(type => {
        this.serviceType = type;
      })
    );
    
    this.subscription.add(
      this.formModalService.formData$.subscribe(data => {
        this.formData = data;
      })
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  closeModal() {
    this.formModalService.closeForm();
  }
  
  
  onNextStep(step: FormStep, formData: any) {
    this.formModalService.nextStep(step, formData);
  }
  
  onPreviousStep(step: FormStep) {
    this.formModalService.previousStep(step);
  }
  
  onFormComplete(finalData: any) {
    console.log('Form completed with data:', {...this.formData, ...finalData});
    this.closeModal();
    // Ici vous pourriez envoyer les données au backend
  }
}
