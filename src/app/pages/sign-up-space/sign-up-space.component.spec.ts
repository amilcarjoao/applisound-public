import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSpaceComponent } from './sign-up-space.component';

describe('SignUpSpaceComponent', () => {
  let component: SignUpSpaceComponent;
  let fixture: ComponentFixture<SignUpSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
