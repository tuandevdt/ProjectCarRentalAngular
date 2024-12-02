import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../service/admin/product/product.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css'] // Chỉnh sửa ở đây
})
export class ListProductLab implements OnInit {
  products: any = []; // Sửa kiểu dữ liệu cho rõ ràng
  lists: any[] = []; // Khai báo biến lists
  constructor(private productsService: ProductService) { } // Đóng dấu ngoặc nhọn ở đây

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      this.lists = this.products.data;
      // console.log('list products', this.lists);
      
    });
  }

  handleDelete(id: number) {

    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
        this.productsService.deleteProduct(id).subscribe({
            next: () => {
                this.productsService.getAllProducts().subscribe(data => {
                    this.products = data;
                    this.lists = this.products.data;
                });
            },
            error: (error) => {
                console.error('Error deleting product:', error);
            }
        });
    } else {
        console.log('Delete action was cancelled.');
    }
  }
}