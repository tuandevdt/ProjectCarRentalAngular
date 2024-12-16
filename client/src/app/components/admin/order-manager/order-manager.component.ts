import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/admin/order/order.service';
import { CommonModule } from '@angular/common';
import { CurrencyFormatService } from '../../../service/currency-format-service.service';

@Component({
  selector: 'app-order-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.css'
})
export class OrderManagerComponent implements OnInit {
  orders: any = [];
  isShowOrder: boolean = false;
  selectedOrder: any = null;

  constructor(
    private orderService: OrderService,
    private formatCurrency: CurrencyFormatService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      console.log('orders',data);
      this.orders = data;
      this.orders.forEach((item: any) => {
        item.formattedSumPrice = this.formatCurrency.formatCurrency(item.sumPrice); 
      }); 
    })
  }

  showOrder(order: any): void {
    this.selectedOrder = order;
    console.log('this.selectedOrder',this.selectedOrder);
    
    this.isShowOrder = true;
  }

  closeOrderDetails(): void {
    this.isShowOrder = false; 
    this.selectedOrder = null;
  }
}
