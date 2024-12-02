import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/admin/product/product.service';
import { CommonModule } from '@angular/common';
import { CurrencyFormatService } from '../../../service/currency-format-service.service';


@Component({
  selector: 'app-my-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-checkout.component.html',
  styleUrls: ['./my-checkout.component.css']
})
export class MyCheckoutComponent implements OnInit {
  countdown: number = 900; // 15 phút = 900 giây
  interval: any;
  userInfor: any;
  infor: any = {};
  product: any = {};
  randomCode: string = ''; 
  startCountdown: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private currencyFormatService: CurrencyFormatService 
  ) {}

  getFormatPrice(price: any): string {
    return this.currencyFormatService.formatCurrency(price);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userInfor = params;
      const id = this.userInfor.id;
      this.productService.getProductById(id).subscribe((item: any) => {
        this.product = item;
      });
      this.infor = this.userInfor;
    });

    this.randomCode = this.generateRandomCode();
    this.startCountdown = true;
    
  }

  generateRandomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const randomLetters = Array.from({ length: 2 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    const randomNumbers = Array.from({ length: 8 }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');

    return randomLetters + randomNumbers;
  }

  
}