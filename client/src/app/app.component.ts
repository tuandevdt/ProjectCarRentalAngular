import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/user/homeComponent/home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/user/products/products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './root/root.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { CategoryManagerComponent } from './components/admin/category-manager/category-manager.component';
import { ProductManagerComponent } from './components/admin/product-manager/product-manager.component';
import { OrderManagerComponent } from './components/admin/order-manager/order-manager.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { MyCheckoutComponent } from './components/user/my-checkout/my-checkout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductsComponent,
    DetailComponent,
    PageNotFoundComponent,
    RootComponent,
    DashboardComponent,
    CategoryManagerComponent,
    ProductManagerComponent,
    OrderManagerComponent,
    CheckoutComponent,
    MyCheckoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
}
