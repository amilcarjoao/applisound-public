import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducsoundsPageComponent } from './producsounds-page.component';

describe('ProducsoundsPageComponent', () => {
  let component: ProducsoundsPageComponent;
  let fixture: ComponentFixture<ProducsoundsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducsoundsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducsoundsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
