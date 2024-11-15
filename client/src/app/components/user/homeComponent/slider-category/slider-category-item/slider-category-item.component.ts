import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider-category-item',
  standalone: true,
  imports: [],
  templateUrl: './slider-category-item.component.html',
  styleUrl: './slider-category-item.component.css'
})
export class SliderCategoryItemComponent {
 @Input() name: string = '';
 @Input() image: string = '';
}
