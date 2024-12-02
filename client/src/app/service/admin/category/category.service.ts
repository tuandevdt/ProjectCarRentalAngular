import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:3000/v1/api/admin/categories";
  constructor(private http: HttpClient) { }
  addCategory(data: any) {
    return this.http.post(this.url, { data });
  }
  getAllCategories() {
    return this.http.get(this.url);
  }

  updateCategory(data: any, id: number) {
    return this.http.patch(`${this.url}/${id}`, data); 
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
