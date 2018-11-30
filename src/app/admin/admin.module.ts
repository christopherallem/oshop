import { DataTableModule } from 'angular-6-datatable';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { AdminProductsComponent } from './component/admin-products/admin-products.component';
import { AdminOrdersComponent } from './component/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTableModule,
    RouterModule.forChild([
      
      { path: 'admin/products/new', 
      component: ProductFormComponent, 
      canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'admin/products/:id', 
      component: ProductFormComponent, 
      canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'admin/products', 
      component: AdminProductsComponent, 
      canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
