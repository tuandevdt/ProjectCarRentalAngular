import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../service/admin/product/product.service';
import { CommonModule } from '@angular/common';
import { CurrencyFormatService } from '../../../service/currency-format-service.service';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css'] 
})
export class ProductManagerComponent implements OnInit {
  products: any = []; 
  lists: any[] = []; 
  constructor(private productsService: ProductService,
    private formatCurrency: CurrencyFormatService,
  ) { } 

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      this.lists = this.products.data;   
      this.lists.forEach(item => {
        item.formattedPrice = this.formatCurrency.formatCurrency(item.price); 
        item.formattedDeposit = this.formatCurrency.formatCurrency(item.deposit); 
      });   
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