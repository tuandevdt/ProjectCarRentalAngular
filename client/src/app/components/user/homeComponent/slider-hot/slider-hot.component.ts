import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SliderHotItemComponent } from './slider-hot-item/slider-hot-item.component';
import { ProductService } from '../../../../service/admin/product/product.service';
import { SliderItemComponent } from '../slider/slider-item/slider-item.component';

@Component({
  selector: 'app-slider-hot',
  standalone: true,
  imports: [SliderHotItemComponent, CommonModule, SliderItemComponent],
  templateUrl: './slider-hot.component.html',
  styleUrl: './slider-hot.component.css'
})
export class SliderHotComponent implements AfterViewInit, OnInit {
    products: any = [];
    lists: any = [];
  private slider: HTMLElement | null = null;
  private prevBtn: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private currentIndex: number = 0;
  private slidesPerView: number = 4;
  private totalSlides: number = 0;

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef, 
    @Inject(PLATFORM_ID) 
    private platformId: Object,
    private productService: ProductService,
) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
        this.products = data;
        this.lists = this.products.data;
      });
}
  ngAfterViewInit() {
      this.slider = this.el.nativeElement.querySelector('#sliderHot');
      this.prevBtn = this.el.nativeElement.querySelector('#prevBtnHot');
      this.nextBtn = this.el.nativeElement.querySelector('#nextBtnHot');

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
