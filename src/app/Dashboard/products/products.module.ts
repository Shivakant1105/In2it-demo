import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ProductTableListComponent } from './product-table-list/product-table-list.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductTableListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule, SharedModule,    FeatherModule.pick(allIcons),
  ]
})
export class ProductsModule { }
