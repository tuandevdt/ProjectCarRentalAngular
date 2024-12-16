import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';  // Sửa import ở đây

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  rentalData: any;
  infor: any = {};
  isUsername: boolean = false;
  isPhone: boolean = false; 
  userInfor =  {
    username: "",
    phone: "",
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rentalData = params;
      
      this.infor = this.rentalData;
      
    });
  }

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

  onSubmit() {
    if(this.userInfor.username == '') {
      alert("Vui long nhập đầy đủ thông tin")
      this.isUsername = true;
      return;
    } else {
      this.isUsername = false;
    }
    if(this.userInfor.phone == '') {
      alert("Vui long nhập đầy đủ thông tin")
      this.isPhone = true;
      return;
    } else {
      this.isPhone = false
    }
    const userInfor = {
      username: this.userInfor.username,
      phone: this.userInfor.phone,
      startTime: this.rentalData.startTime,
      startDate: this.rentalData.startDate,
      endTime: this.rentalData.endTime,
      endDate: this.rentalData.endDate,
      sumPrice: (+this.rentalData.price + this.rentalData.price * 0.1),
      id: this.rentalData.id,
      address: this.rentalData.address,
      deliveryMethod: this.rentalData.deliveryMethod,
    }
    this.router.navigate(['/mycheckout'], { queryParams: userInfor });

  }
}
