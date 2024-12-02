import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'contact-us',
    component: ContactUsComponent,

  },
  { path:
    'our-products',
    component: OurProductsComponent },
  { path: '',
    redirectTo: '/our-products',
    pathMatch: 'full'
  },




];
