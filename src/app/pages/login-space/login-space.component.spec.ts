import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSpaceComponent } from './login-space.component';

describe('LoginSpaceComponent', () => {
  let component: LoginSpaceComponent;
  let fixture: ComponentFixture<LoginSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
