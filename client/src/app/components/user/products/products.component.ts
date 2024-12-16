import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../service/admin/product/product.service';
import { CategoryService } from '../../../service/admin/category/category.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductHotsComponent } from '../homeComponent/product-hots/product-hots.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ProductItemComponent, ProductHotsComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, DoCheck {
  cities: any = [];
  listcity: any = [];

  listSeats: any = [];

  products: any = [];
  lists: any = [];
  categories: any = [];
  initProducts: any = [];
  categoryId: number | null = null;
  productName: string = '';
  productsList: any = [];
  id: any;
  city: string | null = null;
  seats: string | null = null;

  filters = {
    city: null as string | null,  
    seats: null as string | null,
    categoryId: null as number | null,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.lists = data;
      this.initProducts = this.lists.data; // Lưu danh sách ban đầu
      this.productsList = [...this.initProducts]; 

      const cityNames = this.productsList.map((item: any) => item.city); 
      const uniqueCities = [...new Set(cityNames)]; 
      
      this.cities = uniqueCities;
      const seatNames = this.productsList.map((item: any) => item.seats)
      const uniqueSeats = [...new Set(seatNames)];
      console.log('uniqueSeats',uniqueSeats);
      this.listSeats = uniqueSeats;
      
      console.log('this.cities products',uniqueCities);
      
      this.checkQueryParamsAndApplyFilters(); 

      this.searchProduct()
    });

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
  ngDoCheck(): void {
    
  }

  checkQueryParamsAndApplyFilters(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const city = queryParams.get('city');
      const seat = queryParams.get('seat');
      const categoryId = queryParams.get('categoryId');
  
      if (city) {
        this.filters.city = city;
      }
      if (seat) {
        this.filters.seats = seat;
      }
      if (categoryId) {
        this.filters.categoryId = Number(categoryId);
      }
  
      this.applyFilters();
    });
  }

  onCityChange(event: any) {
    const selectedCity = event.target.value;
    this.filters.city = selectedCity;
    this.router.navigate([], { 
      queryParams: { city: selectedCity },
      queryParamsHandling: 'merge'
    });
    this.applyFilters();
  }
  
  onSeatChange(event: any) {
    const selectedSeat = event.target.value;
    this.filters.seats = selectedSeat;

    this.router.navigate([], { 
      queryParams: { seat: selectedSeat },
      queryParamsHandling: 'merge' 
    });
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    this.filters.categoryId = selectedCategoryId;
    this.router.navigate([], { 
      queryParams: { categoryId: selectedCategoryId },
      queryParamsHandling: 'merge' 
    });
    this.applyFilters(); 
  }
  
  applyFilters(): void {
    let filteredProducts = [...this.initProducts]; 

    if (this.filters.city) {
      filteredProducts = filteredProducts.filter((product: any) => product.city === this.filters.city);
    }

    if (this.filters.seats) {
      filteredProducts = filteredProducts.filter((product: any) => product.seats === this.filters.seats);
    }

    if (this.filters.categoryId) {
      
      filteredProducts = filteredProducts.filter((product: any) => product.categoryId === this.filters.categoryId);
    }
    this.products = filteredProducts;
    console.log('Sản phẩm sau khi lọc:', this.products);
  }

  checkCityFromQueryParams(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const city = queryParams.get('city');
       if (city) {
        this.filters.city = city; 
        console.log('City từ queryParams:', city);
        this.applyFilters(); 
      }
    });
  }
  checkSeatsFromQueryParams(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const seat = queryParams.get('seat');
      if (seat) {
        this.filters.seats = seat; 
        console.log('Seats từ queryParams:', seat);
        this.applyFilters();
      }
    });
  }

  checkCategoryFromQueryParams(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const categoryId = queryParams.get('categoryId');
      if (categoryId) {
        this.filters.categoryId = Number(categoryId);
        console.log('categoryId từ queryParams:', categoryId);
        this.applyFilters();
      }
    });
  }

  removeFilter() {
    this.products = [...this.initProducts];
    
    this.router.navigate(["/products"], { queryParams: {}, queryParamsHandling: 'merge' });
  }

  searchProduct() {
    this.products = [...this.initProducts].filter((item) =>
      item.name.toLowerCase().includes(this.productName.toLowerCase())
    );
  }
}
