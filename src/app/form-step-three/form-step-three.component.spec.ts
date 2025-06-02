import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepThreeComponent } from './form-step-three.component';

describe('FormStepThreeComponent', () => {
  let component: FormStepThreeComponent;
  let fixture: ComponentFixture<FormStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStepThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
