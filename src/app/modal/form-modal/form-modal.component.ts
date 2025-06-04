import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalService, FormStep } from '../../services/form-modal.service';
import { FormStepOneComponent } from '../../form-step-one/form-step-one.component';
import { FormStepTwoComponent } from '../../form-step-two/form-step-two.component';
import { FormStepThreeComponent } from '../../form-step-three/form-step-three.component';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, FormStepOneComponent, FormStepTwoComponent, FormStepThreeComponent],
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(50px)', opacity: 0 }))
      ])
    ]),
    trigger('confirmAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class FormModalComponent implements OnInit, OnDestroy {
  currentStep: FormStep = 'none';
  serviceType: string = '';
  formData: any = {};
  showConfirmation: boolean = false;
  
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
    
    this.subscription.add(
      this.formModalService.showConfirmation$.subscribe(show => {
        this.showConfirmation = show;
      })
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  closeModal() {
    this.formModalService.closeForm();
  }
  
  confirmClose() {
    this.formModalService.confirmClose();
  }
  
  cancelClose() {
    this.formModalService.cancelClose();
  }
  
  onNextStep(step: FormStep, formData: any) {
    this.formModalService.nextStep(step, formData);
  }
  
  onPreviousStep(step: FormStep) {
    this.formModalService.previousStep(step);
  }
  
  onFormComplete(finalData: any) {
    console.log('Form completed with data:', {...this.formData, ...finalData});
    this.formModalService.completeForm();
    this.closeModal();
  }
}
