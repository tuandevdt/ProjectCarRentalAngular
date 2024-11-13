import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { ProductHotsComponent } from '../product-hots/product-hots.component';
import { SearchHomeComponent } from '../search-home/search-home.component';
import { SliderCategoryComponent } from '../slider-category/slider-category.component';
import { SliderHotComponent } from '../slider-hot/slider-hot.component';
import { HotPlaceComponent } from '../hot-place/hot-place.component';
import { CarExperienceComponent } from '../car-experience/car-experience.component';
declare function alertHomePage(): void;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet, 
    SliderComponent, 
    ProductHotsComponent, 
    SearchHomeComponent, 
    SliderCategoryComponent,
    SliderHotComponent,
    HotPlaceComponent,
    CarExperienceComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 ngOnInit(): void {//chỉ gọi 1 lần, nếu input thì gọi onChange
   alertHomePage();
 }
}
