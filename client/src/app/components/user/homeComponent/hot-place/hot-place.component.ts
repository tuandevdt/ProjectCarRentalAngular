import { Component, OnInit } from '@angular/core';
import { HotPlaceItemComponent } from './hot-place-item/hot-place-item.component';
import { ProductService } from '../../../../service/admin/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hot-place',
  standalone: true,
  imports: [HotPlaceItemComponent,CommonModule],
  templateUrl: './hot-place.component.html',
  styleUrl: './hot-place.component.css'
})
export class HotPlaceComponent implements OnInit {
  cities: any = [];
  list: any = [];
  cityImages: any = {
    "Hồ Chí Minh": "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474076bQY/50-hinh-anh-thanh-pho-ho-chi-minh-dep-nhat_104035909.jpg",
    "Đà Nẵng": "https://danangsensetravel.com/view/at_ve-dep-thanh-pho-da-nang-giu-tron-tung-khoanh-khac_6b555585df3ca96d931cf6f4378c9488.jpg",
    "Hà Nội": "https://phunuvietnam.mediacdn.vn/179072216278405120/2020/6/2/ho-guom-ha-noi-15910972219671262498174.jpg",
  };
    constructor(
      private serviceProduct: ProductService,
    ) {}
    ngOnInit(): void {
      this.serviceProduct.getAllProducts().subscribe(data => {
        this.list = data;
        const cityNames = this.list.data.map((item: any) => item.city); 
        const uniqueCities = [...new Set(cityNames)]; 
        
        this.cities = uniqueCities;
        this.cities = uniqueCities.map((city: any) => ({
          name: city,
          image: this.cityImages[city] || 'https://danangsensetravel.com/view/at_ve-dep-thanh-pho-da-nang-giu-tron-tung-khoanh-khac_6b555585df3ca96d931cf6f4378c9488.jpg', 
        }));
        console.log('Cities:', this.cities);
      });
    }
    
}
