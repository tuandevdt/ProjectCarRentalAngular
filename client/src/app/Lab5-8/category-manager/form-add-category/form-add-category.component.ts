import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../service/admin/category/category.service';
import { Router } from '@angular/router';  
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-add-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-add-category.component.html',
  styleUrls: ['./form-add-category.component.css']
})
export class FormAddCategoryLab {
  @Output() categoryAdded = new EventEmitter<any>();

  constructor(private addService: CategoryService, private router: Router) {}

  formAddCategoryGroup: FormGroup = new FormGroup({
    categoryNameControl: new FormControl(
      null, 
      [
        Validators.required, 
        Validators.minLength(3),  
        Validators.maxLength(50)
      ]
    ),
    descriptionControl: new FormControl(
      null, 
      [
        Validators.required, 
        Validators.minLength(5)  
      ]
    ),
    categoryImageControl: new FormControl(
      null, 
      [
        Validators.required, 
      ]
    ),
  });

  get addCategoryFormControl() {
    return this.formAddCategoryGroup.controls;
  }

  async formAddCategory() {
    if (this.formAddCategoryGroup.invalid) {
      alert("Vui lòng nhập đầy đủ và chính xác thông tin trước khi thêm.");
      return;
    }

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
