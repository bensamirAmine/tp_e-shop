import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'our-products', component: OurProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'order-history',
    component: MyOrdersComponent,
  },
  { path: '', redirectTo: '/our-products', pathMatch: 'full' },
];
