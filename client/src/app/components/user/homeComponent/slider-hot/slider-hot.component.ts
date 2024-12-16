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
export class SliderHotComponent implements OnInit {
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
        this.lists = this.products.data.filter((product: any) => product.city === 'Hồ Chí Minh');
      });
}

  prevSlide() {
    this.slider = this.el.nativeElement.querySelector('#sliderHot');
      if (this.slider && this.currentIndex > 0) {
          this.currentIndex--;
          this.updateSlider();
      }
  }

  nextSlide() {    
    this.slider = this.el.nativeElement.querySelector('#sliderHot');
    this.totalSlides = this.slider?.children.length ?? 0;
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
