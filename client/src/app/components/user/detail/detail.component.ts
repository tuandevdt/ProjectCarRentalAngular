import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/admin/product/product.service';

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
  isStart: boolean = false;
  isEnd: boolean = false;
  selectedOption: string = 'pickup'; // Mặc định là "Nhận xe tại vị trí xe"
  deliveryAddress: string = ''; // Địa chỉ giao xe
  addressNew: string = "";
  isValidAddress: boolean = false;
  // Tạo một đối tượng để lưu dữ liệu form
  rentalData = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    promoCode: '',
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((item: any) => {
      this.product = item;
    });
  }

  onSubmit() {
    if(this.rentalData.startDate == '' || this.rentalData.startTime == '') {
      this.isStart = true;
      return;
    } else {
      this.isStart = false;
    }
    if(this.rentalData.endDate == "" || this.rentalData.endTime == '') {
      this.isEnd = true;
      return;
    } else {
      this.isEnd = false;
    }

    if(this.selectedOption == "pickup") {
      this.addressNew = this.product.address;
    } else {
      this.addressNew = this.deliveryAddress;
    }
    if(this.selectedOption == 'delivery' && this.deliveryAddress == '') {
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
      price: this.product.price
    };
    console.log('fianl data', rentalData);
    this.router.navigate(['/checkout'], { queryParams: rentalData });

    // Thực hiện các hành động cần thiết, như gửi dữ liệu đến server
  }
}