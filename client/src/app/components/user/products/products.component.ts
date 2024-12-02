import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductHotsComponent } from '../homeComponent/product-hots/product-hots.component';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/admin/product/product.service';
import { CategoryService } from '../../../service/admin/category/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule, ProductItemComponent, ProductHotsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any = [];
  lists: any = [];
  categories: any = [];
  initProducts: any = [];
  constructor(
    private router: Router, 
    private productService: ProductService,
    private categoryService: CategoryService,

  ) { }
  productName: string = "";
  id: any;


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.lists = data;
      this.products = this.lists.data;
      this.initProducts = this.products;
    });
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }



  searchProduct(){
      this.products = [...this.initProducts].filter((item) =>
        item.name.toLowerCase().includes(this.productName.toLowerCase())
      );
        console.log(this.products);
        this.router.navigate(["products"], {
          queryParams: {name: this.productName}
        });
  }

}
