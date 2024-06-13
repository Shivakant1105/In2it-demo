import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  {path:'', redirectTo:'menu', pathMatch:'full'},
  {
    path: 'menu',
    loadChildren: () =>import("../app/Dashboard/my-menu/my-menu.module").then((x)=>{
      return x.MyMenuModule
    })
  },
  {
    path: 'org',
    loadChildren: () =>import("../app/Dashboard/organization/organization.module").then((x)=>{
      return x.OrganizationModule
    })
  },

  {
    path: 'products',
    loadChildren: () =>import("../app/Dashboard/products/products.module").then((x)=>{
      return x.ProductsModule    })
  },
  {
    path: 'designer',
    loadChildren: () =>import("../app/Dashboard/designer/designer.module").then((x)=>{
      return x.DesignerModule    })
  },
  {
    path: 'set',
    loadChildren: () =>import("../app/Dashboard/setting/setting.module").then((x)=>{
      return x.SettingModule    })
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
