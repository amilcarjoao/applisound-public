import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceoverPageComponent } from './voiceover-page.component';

describe('VoiceoverPageComponent', () => {
  let component: VoiceoverPageComponent;
  let fixture: ComponentFixture<VoiceoverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceoverPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoiceoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
