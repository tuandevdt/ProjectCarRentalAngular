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
export class SliderCategoryComponent implements OnInit {
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
  private currentIndex: number = 0;
  private slidesPerView: number = 7;
  private totalSlides: number = 0;



  prevSlide() {
    this.slider = this.el.nativeElement.querySelector('#slider-category');
      if (this.slider && this.currentIndex > 0) {
          this.currentIndex--;
          this.updateSlider();
      }
  }

  nextSlide() {    
    this.slider = this.el.nativeElement.querySelector('#slider-category');
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
