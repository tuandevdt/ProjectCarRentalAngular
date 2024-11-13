import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() name = '';
  @Input() productId = 0;
  @Input() price = 0;
  @Input() url = '';
  @Input() isSave = false;
  @Output() isSaveEvent = new EventEmitter<any>();

  handleFavorite() {    
    this.isSaveEvent.emit({id: this.productId, isSave: !this.isSave});
  }

}
