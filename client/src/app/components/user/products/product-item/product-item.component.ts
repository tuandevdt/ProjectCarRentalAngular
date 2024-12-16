import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyFormatService } from '../../../../service/currency-format-service.service';
import { format } from 'path';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  @Input() name = '';
  @Input() productId = 0;
  @Input() price = 0;
  @Input() url = '';
  @Input() categoryId = 0;
  @Input() city = "";
  @Input() seats = "";
  initPrice: any;
  formattedPrice: any;
  formattedInitPrice: any;
  constructor(
    private formatCu: CurrencyFormatService
  ) { }

  ngOnInit(): void {
    this.initPrice = this.price * 1.5
    this.formattedInitPrice = this.formatCu.formatCurrency(Number(this.initPrice));
    this.formattedPrice = this.formatCu.formatCurrency(Number(this.price));
  }
}
