import { Component, ViewChild, ElementRef } from '@angular/core';
import { PlayerSoundtracksComponent } from "../../widgets/player-soundtracks/player-soundtracks.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlayerSoundtracksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  @ViewChild('playersWrapper') playersWrapper!: ElementRef;
  private isDragging = false;
  private startX: number = 0;
  private initialScrollLeft: number = 0;

  ngAfterViewInit() {
    const wrapper = this.playersWrapper.nativeElement;
    
    wrapper.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.startX = e.pageX - wrapper.offsetLeft;
      this.initialScrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    wrapper.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    wrapper.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      wrapper.scrollLeft = this.initialScrollLeft - walk;
    });
  }

  scrollToPrevious() {
    const wrapper = this.playersWrapper.nativeElement;
    wrapper.scrollBy({
      left: -500,
      behavior: 'smooth'
    });
  }

  scrollToNext() {
    const wrapper = this.playersWrapper.nativeElement;
    wrapper.scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  }

//FIN DE CLASS DONT TUCH
}
