import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../../../service/admin/product/product.service';
import { CategoryService } from '../../../../service/admin/category/category.service';

@Component({
  selector: 'app-form-new-product',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form-new-product.component.html',
  styleUrls: ['./form-new-product.component.css']
})
export class FormNewProductComponent implements OnInit {
  formEditCategoryGroup: FormGroup;
  categories: any = [];
  constructor(
    private formBuilder: FormBuilder, 
    private productService: ProductService, 
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.formEditCategoryGroup = this.formBuilder.group({
      nameControl: ['', Validators.required],
      priceControl: ['', [Validators.required, Validators.min(0)]],
      depositControl: ['', [Validators.required, Validators.min(0)]],
      addressControl: ['', Validators.required],
      descriptionControl: ['', Validators.required],
      categoryIdControl: ['', Validators.required],
      image1Control: ['', Validators.required],
      image2Control: [''],
      image3Control: [''],
      image4Control: [''],
      cityControl: ["", Validators.required],
      typeControl: [""],
      seatsControl: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onEditSubmit() {
    if (this.formEditCategoryGroup.valid) {
      const formData = this.formEditCategoryGroup.value;

      const newProduct = {
        name: formData.nameControl,
        price: formData.priceControl,
        deposit: formData.depositControl,
        address: formData.addressControl,
        description: formData.descriptionControl,
        categoryId: Number(formData.categoryIdControl),
        city: formData.cityControl,
        type: formData.typeControl,
        seats: formData.seatsControl,
        image1: formData.image1Control,
        image2: formData.image2Control,
        image3: formData.image3Control,
        image4: formData.image4Control
      };

      this.productService.addProduct(newProduct).subscribe({
        next: (data) => {
          console.log('Product created:', data);
          this.formEditCategoryGroup.reset();
          this.router.navigate(['/admin/products']); // Chuyển hướng về trang sản phẩm
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  closeEditModal() {
    this.formEditCategoryGroup.reset(); // Đặt lại form khi đóng modal
  }
}