import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoryService } from '../../../service/admin/category/category.service';
import { ProductService } from '../../../service/admin/product/product.service';
import { OrderService } from '../../../service/admin/order/order.service';
import { CurrencyFormatService } from '../../../service/currency-format-service.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular'; 
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  chartBars: Highcharts.Options = {};
  orders: any = [];
  categories: any = [];
  products: any = [];
  totalPrice: any = 0;
  top10Products: any = [];
  countProduct: number = 0;
  countCategory: number = 0;
  categoryCounts: { [key: string]: number } = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private orderService: OrderService,
    private formatVnd: CurrencyFormatService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadData();
    this.updateCharts();

  }


  private loadData(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      this.totalPrice = this.orders.reduce((sum: number, order: any) => sum + Number(order.sumPrice), 0);
      this.totalPrice = this.formatVnd.formatCurrency(this.totalPrice)
    });

    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.countProduct = this.products.data.length;
      
      this.categoryCounts = this.products.data.reduce((counts: any, product: any) => {
        const categoryName = product.category?.name;
        if (categoryName) counts[categoryName] = (counts[categoryName] || 0) + 1;
        return counts;
      }, {});

      this.top10Products = this.getTop10Products(this.products.data);
      this.updateCharts(); // Cập nhật biểu đồ
    });

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
      this.countCategory = this.categories.length;
    });
  }

  private updateCharts(): void {
    const categories = Object.keys(this.categoryCounts);
    const productCounts = Object.values(this.categoryCounts);

    this.chartOptions = {
      chart: { type: 'column' },
      title: { text: 'Top 10 Products by Price' },
      xAxis: { categories: this.top10Products.map((p: any) => p.name) },
      yAxis: { title: { text: 'Price (đ)' } },
      series: [
        {
          name: 'Price',
          data: this.top10Products.map((p: any) => Number(p.price) || 0),
          type: 'column',
        },
      ],
    };

    this.chartBars = {
      chart: { type: 'bar' },
      title: { text: 'Product Count by Category' },
      xAxis: { categories: categories },
      yAxis: { title: { text: 'Number of Products' } },
      series: [
        {
          name: 'Products',
          data: productCounts.map((count: any) => count || 0),
          type: 'bar',
          colorByPoint: true,
        },
      ],
    };
  }

  private getTop10Products(products: any[]): any[] {
    return products.sort((a: any, b: any) => b.price - a.price).slice(0, 10);
  }
}
