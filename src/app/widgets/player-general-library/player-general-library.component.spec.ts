import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGeneralLibraryComponent } from './player-general-library.component';

describe('PlayerGeneralLibraryComponent', () => {
  let component: PlayerGeneralLibraryComponent;
  let fixture: ComponentFixture<PlayerGeneralLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerGeneralLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerGeneralLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
