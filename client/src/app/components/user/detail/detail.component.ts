import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/admin/product/product.service';
import { OrderService } from '../../../service/admin/order/order.service';
import { time } from 'console';
import { CurrencyFormatService } from '../../../service/currency-format-service.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: any;
  product: any = {};
  orders: any = [];
  busyTime: any = '';
  busyTimes: any = [];
  showBusyTime: boolean = false;
  isStart: boolean = false;
  isEnd: boolean = false;
  selectedOption: string = 'pickup'; // Mặc định là "Nhận xe tại vị trí xe"
  deliveryAddress: string = ''; // Địa chỉ giao xe
  addressNew: string = "";
  isValidAddress: boolean = false;
  rentalData = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    promoCode: '',
  };
  rentalPrice: number = 0;
  errorMessage: string = "";

  formatPrice4h: any;
  initPrice4h: any;
  formatPrice8h: any;
  initPrice8h: any;
  formatPrice12h: any;
  initPrice12h: any;
  formatPrice24h: any;
  initPrice24h: any;
  priceVAT: any;
  sumPriceRental: any;  
  depositPrice: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private formatCurrency: CurrencyFormatService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((item: any) => {
      this.product = item;
      console.log('this.product',this.product);
      this.initPrice4h = this.formatCurrency.formatCurrency(this.product.price / 3.2);
      this.formatPrice4h = this.formatCurrency.formatCurrency(this.product.price / 4);

      this.initPrice8h = this.formatCurrency.formatCurrency(this.product.price / 1.5);
      this.formatPrice8h = this.formatCurrency.formatCurrency(this.product.price / 2);

      this.initPrice12h = this.formatCurrency.formatCurrency(this.product.price / 1.5);
      this.formatPrice12h = this.formatCurrency.formatCurrency(this.product.price / 2);

      this.initPrice24h = this.formatCurrency.formatCurrency(this.product.price * 1.2);
      this.formatPrice24h = this.formatCurrency.formatCurrency(this.product.price);

      this.priceVAT = this.formatCurrency.formatCurrency(this.product.price * 0.2);
      this.sumPriceRental = this.formatCurrency.formatCurrency(+this.product.price + this.product.price * 0.2);
      this.depositPrice = this.formatCurrency.formatCurrency(30000000);
    });
    this.orderService.getOrder(this.id).subscribe(
      response => {
        if (response) {
          this.orders = response;
    
          this.busyTimes = [];  
          this.showBusyTime = false; 
    
          this.orders.forEach((order: any) => {
            const startDateTime = new Date(`${order.startDate}T${order.startTime}`);
            startDateTime.setHours(startDateTime.getHours() - 1); 
            const adjustedStartTime = startDateTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const adjustedStartDate = startDateTime.toLocaleDateString('vi-VN');
    
            const endDateTime = new Date(`${order.endDate}T${order.endTime}`);
            endDateTime.setHours(endDateTime.getHours() + 1); 
            const adjustedEndTime = endDateTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const adjustedEndDate = endDateTime.toLocaleDateString('vi-VN');
    
            const busyTime = `${adjustedStartTime} ${adjustedStartDate} đến ${adjustedEndTime} ${adjustedEndDate}`;
            this.busyTimes.push(busyTime);
          });
    
          if (this.busyTimes.length > 0) {
            this.showBusyTime = true;
          }
    
          console.log('All busy times:', this.busyTimes); 
        } else {
          this.showBusyTime = false;
        }
      },
      error => {
        console.error('Lỗi khi get đơn:', error);
      }
    );
    
  }

  calculateRentalPrice(): void {
    if (this.rentalData.startDate && this.rentalData.startTime && this.rentalData.endDate && this.rentalData.endTime) {
      const start = new Date(`${this.rentalData.startDate}T${this.rentalData.startTime}`);
      const end = new Date(`${this.rentalData.endDate}T${this.rentalData.endTime}`);
      const current = new Date(); 
      if (start < current) {
        this.errorMessage = 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại.';
        this.rentalPrice = 0;
        return;
      }

      if (end <= start) {
        this.errorMessage = 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu.';
        this.rentalPrice = 0;
        return;
      }

      this.errorMessage = '';

      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      if (hours <= 6) {
        this.rentalPrice = this.product.price * 0.25;
      } else if (hours <= 12) {
        this.rentalPrice = this.product.price * 0.5;
      } else if (hours <= 18) {
        this.rentalPrice = this.product.price * 0.75;
      } else if (hours <= 24) {
        this.rentalPrice = this.product.price;
      } else {
        const fullDays = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        let extraCharge = 0;

        if (remainingHours <= 6) {
          extraCharge = this.product.price * 0.25;
        } else if (remainingHours <= 12) {
          extraCharge = this.product.price * 0.5;
        } else if (remainingHours <= 18) {
          extraCharge = this.product.price * 0.75;
        } else {
          extraCharge = this.product.price;
        }

        this.rentalPrice = fullDays * this.product.price + extraCharge;
      }
    } else {
      this.errorMessage = 'Vui lòng nhập đầy đủ thời gian thuê.';
      this.rentalPrice = 0;
    }
  }



  onSubmit() {
    console.log('this.rentalData',this.rentalData);
    
    if (this.rentalData.startDate == '' || this.rentalData.startTime == '') {
      alert("Vui long nhập đầy đủ thông tin")
      this.isStart = true;
      return;
    } else {
      this.isStart = false;
    }
  
    if (this.rentalData.endDate == "" || this.rentalData.endTime == '') {
      alert("Vui long nhập đầy đủ thông tin")
      this.isEnd = true;
      return;
    } else {
      this.isEnd = false;
    }
  
    if (this.isTimeOverlapping(this.rentalData.startDate, this.rentalData.startTime, this.rentalData.endDate, this.rentalData.endTime)) {
      alert("Xe bận thời gian này!!!")
      this.errorMessage = 'Thời gian này xe đang bận, vui lòng đặt xe cách thời gian bận trên 4 tiếng.';
      return;
    } else {
      this.errorMessage = '';
    }
  
    if (this.selectedOption == "pickup") {
      this.addressNew = this.product.address;
    } else {
      this.addressNew = this.deliveryAddress;
    }
  
    if (this.selectedOption == 'delivery' && this.deliveryAddress == '') {
      this.isValidAddress = true;
      return
    } else {
      this.isValidAddress = false;
    }
  
    const rentalData = {
      startDate: this.rentalData.startDate,
      startTime: this.rentalData.startTime,
      endDate: this.rentalData.endDate,
      endTime: this.rentalData.endTime,
      promoCode: this.rentalData.promoCode,
      address: this.addressNew,
      id: Number(this.id),
      price: this.rentalPrice,
      deliveryMethod: this.selectedOption,
    };
  
    this.router.navigate(['/checkout'], { queryParams: rentalData });
  }
  
isTimeOverlapping(startDate: string, startTime: string, endDate: string, endTime: string): boolean {
  const rentalStartDateTime = new Date(`${startDate}T${startTime}`);
  rentalStartDateTime.setHours(rentalStartDateTime.getHours());

  const rentalEndDateTime = new Date(`${endDate}T${endTime}`);
  rentalEndDateTime.setHours(rentalEndDateTime.getHours());

  if (Array.isArray(this.orders) && this.orders.length > 0) {
    for (let order of this.orders) {
      const busyStartDateTime = new Date(`${order.startDate}T${order.startTime}`);
      busyStartDateTime.setHours(busyStartDateTime.getHours() - 5);  

      const busyEndDateTime = new Date(`${order.endDate}T${order.endTime}`);
      busyEndDateTime.setHours(busyEndDateTime.getHours() + 5); 

      if (
        (rentalStartDateTime <= busyEndDateTime && rentalStartDateTime >= busyStartDateTime) || 
        (rentalEndDateTime >= busyStartDateTime && rentalEndDateTime <= busyEndDateTime)       
      ) {
        console.log('Time overlaps with busy period');
        return true;
      }
    }
    console.log('No overlap with busy periods');
    return false;
  } else {
    const busyStartDateTime = new Date(`${this.orders.startDate}T${this.orders.startTime}`);
    busyStartDateTime.setHours(busyStartDateTime.getHours() - 5);  
    const busyEndDateTime = new Date(`${this.orders.endDate}T${this.orders.endTime}`);
    busyEndDateTime.setHours(busyEndDateTime.getHours() + 5);  

    if (
      (rentalStartDateTime <= busyEndDateTime && rentalStartDateTime >= busyStartDateTime) ||  
      (rentalEndDateTime >= busyStartDateTime && rentalEndDateTime <= busyEndDateTime)        
    ) {
      console.log('Time overlaps with busy period');
      return true;
    }

    console.log('No overlap with busy period');
    return false;
  }
}

  
  
  
  
}