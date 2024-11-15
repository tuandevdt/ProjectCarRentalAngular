import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SliderCategoryItemComponent } from './slider-category-item/slider-category-item.component';

@Component({
  selector: 'app-slider-category',
  standalone: true,
  imports: [SliderCategoryItemComponent, CommonModule],
  templateUrl: './slider-category.component.html',
  styleUrl: './slider-category.component.css'
})
export class SliderCategoryComponent implements AfterViewInit {
    categories = [
        {
            name: "NISSAN",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FNISSAN_40aeecb60f%2FNISSAN_40aeecb60f.png&w=1920&q=75",
        },
        {
            name: "KIA",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FKia_9c7982be75%2FKia_9c7982be75.png&w=1920&q=75"
        },
        {
            name: "MG",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FMg_345b3020b0%2FMg_345b3020b0.png&w=1920&q=75"
        },
        {
            name: "HONDA",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FHonda_ad76578945%2FHonda_ad76578945.png&w=1920&q=75"
        },
        {
            name: "VOLKSWAGEN",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FVOLKSWAGEN_0d4700e714%2FVOLKSWAGEN_0d4700e714.png&w=1920&q=75"
        },
        {
            name: "BMW",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FBMW_060c9e28c5%2FBMW_060c9e28c5.png&w=1920&q=75"
        },
        {
            name: "MAZDA",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FMazda_68273f1988%2FMazda_68273f1988.png&w=1920&q=75"
        },
        {
            name: "SUZUKI",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FSuzuki_e6c132e427%2FSuzuki_e6c132e427.png&w=1920&q=75"
        },
        {
            name: "VINFAST",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FVinfast_f69a8092ac%2FVinfast_f69a8092ac.png&w=1920&q=75"
        },
        {
            name: "HYUNDAI",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FHYUNDAI_61e00ad541%2FHYUNDAI_61e00ad541.png&w=1920&q=75"
        },
        {
            name: "TOYOTA",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FToyota_4c8cd6a66f%2FToyota_4c8cd6a66f.png&w=1920&q=75"
        },
        {
            name: "MITSUBISHI",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FMITSUBISHI_078469194e%2FMITSUBISHI_078469194e.png&w=1920&q=75"
        },
        {
            name: "FORD",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FFORD_63a3a7ac11%2FFORD_63a3a7ac11.png&w=1920&q=75"
        },
        {
            name: "PEUGEOT",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FPEUGEOT_6956ab99f5%2FPEUGEOT_6956ab99f5.png&w=1920&q=75"
        },
        {
            name: "ZOTYE",
            image: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2FFrame_63056687_2_1_705384ac8a%2FFrame_63056687_2_1_705384ac8a.png&w=1920&q=75"
        },
    ]



  private slider: HTMLElement | null = null;
  private prevBtn: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private currentIndex: number = 0;
  private slidesPerView: number = 7;
  private totalSlides: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
      this.slider = this.el.nativeElement.querySelector('#slider-category');
      this.prevBtn = this.el.nativeElement.querySelector('#prevBtnCate');
      this.nextBtn = this.el.nativeElement.querySelector('#nextBtnCate');

      if (this.slider && this.prevBtn && this.nextBtn) {
          this.totalSlides = this.slider.children.length;
          
          this.renderer.listen(this.prevBtn, 'click', () => this.prevSlide());
          this.renderer.listen(this.nextBtn, 'click', () => this.nextSlide());

          // Chỉ thêm sự kiện resize nếu đang ở môi trường trình duyệt
          if (isPlatformBrowser(this.platformId)) {
              window.addEventListener('resize', () => this.updateSlider());
          }
      } else {
          console.error('Failed to find necessary HTML elements.');
      }
  }

  private prevSlide() {
      if (this.slider && this.currentIndex > 0) {
          this.currentIndex--;
          this.updateSlider();
      }
  }

  private nextSlide() {    
      if (this.slider && this.currentIndex < this.totalSlides - this.slidesPerView) {
          this.currentIndex++;
          this.updateSlider();
      }
  }

  private updateSlider() {
      if (this.slider) {
          this.slider.style.transform = `translateX(-${this.currentIndex * (100 / this.slidesPerView)}%)`;
      }
  }
}
