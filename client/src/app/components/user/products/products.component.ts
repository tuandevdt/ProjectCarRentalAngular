import { Component, inject } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductHotsComponent } from '../homeComponent/product-hots/product-hots.component';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule, ProductItemComponent, ProductHotsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private router: Router) { }
  // router = inject(Router);
  productName: string = "";
  id: any;
  originalProducts = [
    {
      id: 1,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20231",
      price: 21000,
      isSave: false
    },
    {
      id: 2,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20232",
      price: 250000,
      isSave: false
    },
    {
      id: 3,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20233",
      price: 270000,
      isSave: false
    },
    {
      id: 4,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20234",
      price: 230000,
      isSave: false
    },
    {
      id: 5,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20235",
      price: 200000,
      isSave: false
    },
    {
      id: 6,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20236",
      price: 260000,
      isSave: false
    },
    {
      id: 7,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20237",
      price: 250000,
      isSave: false
    },
    {
      id: 8,
      url: "https://www.bonboncar.vn/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbonboncar-cms%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493%2Fz5861331481154_be54e94cbe0133426a5b6a4d21982021_copy_409e048493.jpg&w=1920&q=80",
      name: "MG RX5 20237",
      price: 250000,
      isSave: false
    },

  ]
  products = [...this.originalProducts];

  searchProduct(){
    console.log('productname',this.originalProducts);
      this.products = [...this.originalProducts].filter((item) =>
        item.name.toLowerCase().includes(this.productName.toLowerCase())
      );
        console.log(this.products);
        this.router.navigate(["products"], {
          queryParams: {name: this.productName}
        });
  }
  getData(data: any) {    
    let index = this.products.findIndex((item) => {
      return item.id === data.id;
    })
    this.products[index].isSave = data.isSave;
  }
}
