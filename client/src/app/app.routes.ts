import {
    CanActivateFn,
    Routes,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { HomeComponent } from './components/user/homeComponent/home/home.component';
import { ProductsComponent } from './components/user/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './root/root.component';
import { AdminComponent } from './adminServer/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { CategoryManagerComponent } from './components/admin/category-manager/category-manager.component';
import { ProductManagerComponent } from './components/admin/product-manager/product-manager.component';
import { OrderManagerComponent } from './components/admin/order-manager/order-manager.component';
import { MyCheckoutComponent } from './components/user/my-checkout/my-checkout.component';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject, PLATFORM_ID } from '@angular/core';
import { FormNewProductComponent } from './components/admin/product-manager/form-new-product/form-new-product.component';
import { FormEditProductComponent } from './components/admin/product-manager/form-edit-product/form-edit-product.component';


export const canActivateLogin: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);
    const jwtHelper = new JwtHelperService();

    if (isPlatformBrowser(platformId)) {
        const token = localStorage.getItem('accessToken');

        try {
            if (!jwtHelper.isTokenExpired(token)) {
                const decoded: any = jwtDecode(token as string);
                console.log(decoded);
                router.navigateByUrl('/');
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.error("JWT Error:", error);
            return true;
        }
    }
    return true;
};

export const canActivateAdmin: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
        const token = localStorage.getItem('accessToken');

        try {
            if (!token) {
                

                console.log('Bạn không có quyền truy cập');
                
                router.navigateByUrl('/login');
                return true;
            } else {
                console.log(22);
                
                return false;
            }
        } catch (error) {
            console.error("JWT Error:", error);
            return false;
        }
    }
    console.log(444);
    
    return true;
};

export const routes: Routes = [
    {
        path: "",
        component: RootComponent,
        children: [
            { path: '', component: HomeComponent },
            // { path: '', canActivate: [canActivateLogin], component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: "products/:id", component: DetailComponent },
            { path: "products/category/:id", component: ProductsComponent },
            { path: "checkout", component: CheckoutComponent },
            { path: "mycheckout", component: MyCheckoutComponent },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
    },
    {
        path: "admin",
        component: AdminComponent,
        // canActivate: [canActivateAdmin],
        pathMatch: 'prefix',
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'categories', component: CategoryManagerComponent },
            { path: 'products', component: ProductManagerComponent },
            { path: 'products/new', component: FormNewProductComponent },
            { path: 'products/edit/:id', component: FormEditProductComponent },
            { path: 'orders', component: OrderManagerComponent },

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [canActivateLogin],
    },
    { path: '**', component: PageNotFoundComponent }, 


];
