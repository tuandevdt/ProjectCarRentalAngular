import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
export class HomeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  name: String = "Tuan Dev";
  handleClick() {
    this.name = "Doan Thanh Tuấn";
  }
 ngOnInit(): void {//chỉ gọi 1 lần, gọi khi khởi tạo 
  //  alertHomePage();
  console.log('ngOnInit');
 }
 ngOnChanges(changes: SimpleChanges): void {//nếu input thay đổi thì gọi onChange
  console.log('ngOnChanges');
 }
 ngDoCheck(): void { //gọi khi phát hiện thay đổi dữ liệu
  console.log('ngDoCheck');
 }
 ngOnDestroy(): void {//gọi khi component bị xóa
  console.log('ngOnDestroy');
 }
}
