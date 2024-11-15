import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/homeComponent/home/home.component';
import { ProductsComponent } from './components/user/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './root/root.component';
import { AdminComponent } from './adminServer/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { UserManagerComponent } from './components/admin/user-manager/user-manager.component';
import { CategoryManagerComponent } from './components/admin/category-manager/category-manager.component';
import { ProductManagerComponent } from './components/admin/product-manager/product-manager.component';
import { OrderManagerComponent } from './components/admin/order-manager/order-manager.component';

export const routes: Routes = [
    {
        path: "",
        component: RootComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'products', component: ProductsComponent },
            { path: "products/:id", component: DetailComponent},
            { path: "checkout", component: CheckoutComponent},
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
    },
    {
        path: "admin", 
        component: AdminComponent,
        pathMatch: 'prefix', 
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'users', component: UserManagerComponent },
            { path: 'categories', component: CategoryManagerComponent },
            { path: 'products', component: ProductManagerComponent },
            { path: 'orders', component: OrderManagerComponent },

        ]
    },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page


];
