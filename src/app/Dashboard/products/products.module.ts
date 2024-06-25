import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ProductTableListComponent } from './product-table-list/product-table-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductTableListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule, SharedModule,  FormsModule,  FeatherModule.pick(allIcons),
  ]
})
export class ProductsModule { }
