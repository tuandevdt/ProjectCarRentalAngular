import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-category-manager',
  standalone: true,
  imports: [],
  templateUrl: './list-category-manager.component.html',
  styleUrl: './list-category-manager.component.css'
})
export class ListCategoryManagerComponent {
  @Input() name: string = '';
    
}
