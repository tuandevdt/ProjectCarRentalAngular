import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductItemComponent } from '../../products/product-item/product-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-hots',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProductItemComponent],
  templateUrl: './product-hots.component.html',
  styleUrl: './product-hots.component.css'
})
export class ProductHotsComponent {
  items = [1,2,3,4,5,6,7,]
}
