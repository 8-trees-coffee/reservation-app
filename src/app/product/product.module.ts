import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListingsComponent } from './product-listings/product-listings.component';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.gard';


const routes: Routes = [
    {
        path: 'products', component: ProductComponent,
        children: [
            { path: '', component: ProductListingsComponent},
            { path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard]}
        ],
    }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListingsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: []
})
export class ProductModule { }