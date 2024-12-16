import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/admin/product/product.service';
import { CommonModule } from '@angular/common';
import { CurrencyFormatService } from '../../../service/currency-format-service.service';
import * as QRCode from 'qrcode';  
import { OrderService } from '../../../service/admin/order/order.service';

@Component({
  selector: 'app-my-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-checkout.component.html',
  styleUrls: ['./my-checkout.component.css']
})
export class MyCheckoutComponent implements OnInit {
  userInfor: any;
  product: any = {};
  randomCode: string = ''; 
  qrCodeValue: string = ''; // Dữ liệu mã QR
  qrCodeImage: string = '';
  startCountdown: boolean = false;
  showQRCode: boolean = false; // Track whether QR code should be shown
  showPaymentButton: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private currencyFormatService: CurrencyFormatService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userInfor = params;
      console.log('this.userInfor',this.userInfor);
      
      const id = this.userInfor.id;
      this.randomCode = this.generateRandomCode();

      if (id) {
        this.productService.getProductById(id).subscribe((item: any) => {
          this.product = item;
            
            this.generateQRCode();
        });
      } else {
        console.error('Không tìm thấy ID sản phẩm trong query params.');
      }
    });

    setTimeout(() => {
      this.showPaymentButton = true;
    }, 10000);
    
  }

  generateRandomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const randomLetters = Array.from({ length: 2 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    const randomNumbers = Array.from({ length: 8 }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');
    return randomLetters + randomNumbers;
  }

  generateQRCode(): void {
    if (!this.userInfor || !this.product) {
      console.error('Thiếu dữ liệu để tạo mã QR.');
      return;
    }
  
    const qrData = {
      HoTen: this.userInfor.username || 'Không có tên',
      Sđt: this.userInfor.phone || 'Không có số điện thoại',
      ThoiGianThue: `${this.userInfor.startDate || ''} ${this.userInfor.startTime || ''} - ${this.userInfor.endDate || ''} ${this.userInfor.endTime || ''}`,
      TongTien: this.getFormatPrice(this.product.price || 0),
      DiaChi: this.product.address || 'Không có địa chỉ',
      MaCode: this.randomCode || 'Không có mã'
    };
  
    const qrCodeData = JSON.stringify(qrData);
    console.log("qrCodeData", qrCodeData); 
    
    
    QRCode.toDataURL(qrCodeData, { errorCorrectionLevel: 'M' }, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
      } else {
        this.qrCodeImage = url; 
      }
    });
  }

  onPaymentSuccess(): void {
    this.showQRCode = true;    
    const orderData = {
      code: this.randomCode,
      username: this.userInfor.username || 'Không có tên',
      phone: this.userInfor.phone || 'Không có số điện thoại',
      address: this.product.address || 'Không có địa chỉ',
      startDate: this.userInfor.startDate,
      startTime: this.userInfor.startTime,
      endDate: this.userInfor.endDate,
      endTime: this.userInfor.endTime,
      productId: this.product.id,
      sumPrice: this.userInfor.sumPrice || 0, 
      deliveryMethod: this.userInfor.deliveryMethod || 'pickup'
    };
    this.orderService.addOrder(orderData).subscribe(
      response => {
        console.log('Đã thêm đơn hàng thành công:', response);
      },
      error => {
        console.error('Lỗi khi thêm đơn hàng:', error);
      }
    );
   
  }

  closeQRCodeModal(): void {
    this.showQRCode = false;
  }
  isDataValidForQRCode(): boolean {
    return !!(
      this.userInfor?.name &&
      this.userInfor?.startDate &&
      this.userInfor?.endDate &&
      this.product?.price &&
      this.product?.address
    );
  }


  getFormatPrice(price: number): string {
    return this.currencyFormatService.formatCurrency(price);
  }
}
