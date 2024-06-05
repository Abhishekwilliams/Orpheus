import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit  {
  // slides = [
  //   { src: "../assets/images/homepic1.JPG" },
  //   { src: "../assets/images/homepic2.png" },
  //   { src: "../assets/images/homepic3.JPG" },
    
  // ];
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  currentIndex = 0;
  interval: any;

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 10000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentIndex++;
    if (this.currentIndex >= this.carousel.nativeElement.children.length) {
      this.currentIndex = 0;
    }
    this.slideToCurrent();
  }

  slideToCurrent() {
    this.carousel.nativeElement.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnDestroy() {
    clearInterval(this.interval); // Clear interval to stop carousel when component is destroyed
  }

}
