import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-step-two.component.html',
  styleUrl: './form-step-two.component.scss',
})
export class FormStepTwoComponent {
  // Dans la classe
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  // Ajoutez ces méthodes
  goToNextStep() {
    this.next.emit({});
  }

  goToPreviousStep() {
    this.previous.emit();
  }
}
