import { Component,Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hot-place-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hot-place-item.component.html',
  styleUrl: './hot-place-item.component.css'
})
export class HotPlaceItemComponent {
  @Input() name: string = "";
  @Input() image: string = "";
}
