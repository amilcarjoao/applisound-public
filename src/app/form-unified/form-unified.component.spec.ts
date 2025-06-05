import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnifiedComponent } from './form-unified.component';

describe('FormUnifiedComponent', () => {
  let component: FormUnifiedComponent;
  let fixture: ComponentFixture<FormUnifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUnifiedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUnifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
