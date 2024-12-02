import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyFormatService } from '../../../../service/currency-format-service.service';
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
  @Input() id=0;
constructor(  private currencyFormatService: CurrencyFormatService
) { }
  formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(amount);
  }
getFormatPrice(price: any): string {
  return this.formatCurrency(price);
}

}
