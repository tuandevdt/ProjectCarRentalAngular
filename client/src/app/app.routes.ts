import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/homeComponent/home/home.component';
import { ProductsComponent } from './components/user/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './root/root.component';
import { AdminComponent } from './adminServer/admin/admin.component';
import { DashboardComponent } from './adminServer/dashboard/dashboard.component';
import { DetailComponent } from './components/user/detail/detail.component';

export const routes: Routes = [
    {
        path: "",
        component: RootComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'products', component: ProductsComponent },
            { path: "detail", component: DetailComponent},
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
    },
    {
        path: "admin", 
        component: AdminComponent,
        pathMatch: 'prefix', 
        children: [
            { path: '', component: DashboardComponent },

        ]
    },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page


];
