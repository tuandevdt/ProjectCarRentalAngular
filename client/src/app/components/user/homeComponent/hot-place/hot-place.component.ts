import { Component } from '@angular/core';
import { HotPlaceItemComponent } from './hot-place-item/hot-place-item.component';

@Component({
  selector: 'app-hot-place',
  standalone: true,
  imports: [HotPlaceItemComponent],
  templateUrl: './hot-place.component.html',
  styleUrl: './hot-place.component.css'
})
export class HotPlaceComponent {

}
