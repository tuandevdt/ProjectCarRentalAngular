import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider-category-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './slider-category-item.component.html',
  styleUrl: './slider-category-item.component.css'
})
export class SliderCategoryItemComponent {
 @Input() name: string = '';
 @Input() image: string = '';
 @Input() id: number = 0;
}
