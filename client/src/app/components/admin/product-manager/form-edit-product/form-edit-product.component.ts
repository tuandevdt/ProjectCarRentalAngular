import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../service/admin/product/product.service';
import { CategoryService } from '../../../../service/admin/category/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-edit-product.component.html',
  styleUrls: ['./form-edit-product.component.css']
})


export class FormEditProductComponent implements OnInit {
  formEditCategoryGroup: FormGroup;
  categories: any = [];
  productId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
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
    // Lấy ID sản phẩm từ params
 const id = this.route.snapshot.paramMap.get('id');
 this.productId = Number(id);

    // Tải danh sách danh mục
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getProductById(this.productId).subscribe((item: any) => {
      console.log(item);
      
      this.formEditCategoryGroup.patchValue({
        nameControl: item.name,
        priceControl: item.price,
        depositControl: item.deposit,
        addressControl: item.address,
        descriptionControl: item.description,
        categoryIdControl: item.categoryId,
        cityControl: item.city,
        // typeControl: item.type,
        seatsControl: item.seats,
        image1Control: item.image1,
        image2Control: item.image2,
        image3Control: item.image3,
        image4Control: item.image4
      });
    });
  }

  onEditSubmit() {
    if (this.formEditCategoryGroup.valid) {
      const updatedProduct = {
        id: this.productId,
        ...this.formEditCategoryGroup.value
      };
      console.log('productupdate',updatedProduct);
      
      this.productService.updateProduct(updatedProduct, this.productId).subscribe(() => {
        this.router.navigate(['/admin/products']); // Chuyển hướng về danh sách sản phẩm
      });
    }
  }
}