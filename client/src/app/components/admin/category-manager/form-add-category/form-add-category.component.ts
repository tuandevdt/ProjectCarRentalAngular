import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../service/admin/category/category.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-add-category.component.html',
  styleUrls: ['./form-add-category.component.css']
})
export class FormAddCategoryComponent {
  @Output() categoryAdded = new EventEmitter<any>();

  formAddCategoryGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private addService: CategoryService, private router: Router) {
    this.formAddCategoryGroup = this.formBuilder.group({
      categoryNameControl: ['', [Validators.required, Validators.minLength(3)]],
      descriptionControl: ['', [Validators.required, Validators.minLength(10)]],
      categoryImageControl: ['', Validators.required],
    });
  }

  get addCategoryFormControl() {
    return this.formAddCategoryGroup.controls;
  }

  async formAddCategory() {
    const categoryData = this.formAddCategoryGroup.value;
    console.log('Category Data:', categoryData);
    
    const name: string = categoryData.categoryNameControl;
    const image: string = categoryData.categoryImageControl;
    const description: string = categoryData.descriptionControl;

    this.addService.addCategory({ name, image, description }).subscribe({
        next: (data) => {
            console.log('data create', data);
            this.categoryAdded.emit(data);
            this.formAddCategoryGroup.reset();
        },
        error: (error) => {
            console.error('Error adding category:', error);
        }
    });
  }
}
