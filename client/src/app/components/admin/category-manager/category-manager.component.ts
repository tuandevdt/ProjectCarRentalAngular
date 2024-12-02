import { Component, OnInit } from '@angular/core';
import { TitleCategoryManagerComponent } from './title-category-manager/title-category-manager.component';
import { FormAddCategoryComponent } from './form-add-category/form-add-category.component';
import { ListCategoryManagerComponent } from './list-category-manager/list-category-manager.component';
import { CategoryService } from '../../../service/admin/category/category.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TitleCategoryManagerComponent,
    FormAddCategoryComponent, 
    ListCategoryManagerComponent
  ],
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css'] 
})
export class CategoryManagerComponent implements OnInit {
  categories: any = []; 
  isEditModalOpen: boolean = false;
  formEditCategoryGroup: FormGroup;
  currentEditId: number | null = null;

  constructor(private listService: CategoryService, private fb: FormBuilder) {
    // Khởi tạo form cho việc chỉnh sửa
    this.formEditCategoryGroup = this.fb.group({
      categoryNameControl: ['', Validators.required],
      categoryImageControl: ['', Validators.required],
      descriptionControl: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryAdded(item: any) {
    this.categories.push(item);
    this.listService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  openEditModal(item: any) {
    this.isEditModalOpen = true;
    this.currentEditId = item.id; // Lưu id của danh mục để chỉnh sửa
    this.formEditCategoryGroup.patchValue({
      categoryNameControl: item.name,
      categoryImageControl: item.image,
      descriptionControl: item.description,
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.formEditCategoryGroup.reset(); // Đặt lại form khi đóng modal
    this.currentEditId = null; // Reset id
  }

  onEditSubmit() {
    if (this.formEditCategoryGroup.valid && this.currentEditId) {
      const updatedData = {
        id: this.currentEditId,
        ...this.formEditCategoryGroup.value,
      };
      const name = updatedData.categoryNameControl;
      const image = updatedData.categoryImageControl;
      const description = updatedData.descriptionControl;
      const data = {name, image, description};  
      
      this.listService.updateCategory(data,this.currentEditId).subscribe({
        next: (data) => {
          console.log('data update',data);
          this.listService.getAllCategories().subscribe(data => {
            this.categories = data;
          });
          this.closeEditModal(); 
        },
        error: (error) => {
          console.error('Error updating category:', error);
        }
      });
    }
  }

  deleteCategory(id: number) {
    console.log('id delete', id);
    
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
        this.listService.deleteCategory(id).subscribe({
            next: () => {
                // Cập nhật lại danh sách danh mục sau khi xóa
                this.listService.getAllCategories().subscribe(data => {
                    this.categories = data;
                });
            },
            error: (error) => {
                console.error('Error deleting category:', error);
            }
        });
    } else {
        console.log('Delete action was cancelled.');
    }
}
}