import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SliderCategoryItemComponent } from './slider-category-item/slider-category-item.component';
import { CategoryService } from '../../../../service/admin/category/category.service';

@Component({
  selector: 'app-slider-category',
  standalone: true,
  imports: [SliderCategoryItemComponent, CommonModule],
  templateUrl: './slider-category.component.html',
  styleUrl: './slider-category.component.css'
})
export class SliderCategoryComponent implements AfterViewInit, OnInit {
    categories: any = []; 
    constructor(
        private renderer: Renderer2, 
        private el: ElementRef, 
        @Inject(PLATFORM_ID) 
        private platformId: Object,
        private categoryService: CategoryService,
    ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

  }



  private slider: HTMLElement | null = null;
  private prevBtn: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private currentIndex: number = 0;
  private slidesPerView: number = 7;
  private totalSlides: number = 0;


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
