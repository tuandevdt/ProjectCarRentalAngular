import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyFormatService } from '../../../../../service/currency-format-service.service';

@Component({
  selector: 'app-slider-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-item.component.html',
  styleUrl: './slider-item.component.css'
})
export class SliderItemComponent implements OnInit {
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
  @Input() city: string = "";
  @Input() seats: string = "";
  @Input() type: string = "";

  formatPrice: any = 0;
  initFormatPrice: any = 0;
  constructor(
    private formatCurrency: CurrencyFormatService,
  ) {}
  ngOnInit(): void {
    this.formatPrice = this.formatCurrency.formatCurrency(this.price);
    this.initFormatPrice = this.formatCurrency.formatCurrency(this.price * 1.5) 
  }
}
