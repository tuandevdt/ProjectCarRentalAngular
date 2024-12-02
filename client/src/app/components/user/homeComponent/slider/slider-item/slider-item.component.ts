import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider-item',
  standalone: true,
  imports: [],
  templateUrl: './slider-item.component.html',
  styleUrl: './slider-item.component.css'
})
export class SliderItemComponent {
  @Input() id: number = 0;
  @Input() name: string = ''; 
  @Input() categoryName: string ='';
  @Input() deposit: number = 0; 
  @Input() description: string = ''; 
  @Input() price: number = 0; 
  @Input() address: string = '';
  @Input() image1: string = ''; 
  @Input() image2: string = ''; 
  @Input() image3: string = '';
  @Input() image4: string = ''; 
}
