import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSoundtracksComponent } from './player-soundtracks.component';

describe('PlayerSoundtracksComponent', () => {
  let component: PlayerSoundtracksComponent;
  let fixture: ComponentFixture<PlayerSoundtracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSoundtracksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerSoundtracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
