import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTableListComponent } from './product-table-list/product-table-list.component';

const routes: Routes = [

  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products' , component:ProductListComponent},
  {path:'product-table' , component:ProductTableListComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
