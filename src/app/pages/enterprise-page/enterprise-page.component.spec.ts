import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprisePageComponent } from './enterprise-page.component';

describe('EnterprisePageComponent', () => {
  let component: EnterprisePageComponent;
  let fixture: ComponentFixture<EnterprisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterprisePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterprisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
