import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CustomCellComponent } from './custom-cell/custom-cell.component';



const declared = [
  AgGridComponent, CustomCellComponent
  
];
@NgModule({
  declarations:[...declared, ],
  imports: [
    CommonModule,AgGridModule,FeatherModule.pick( allIcons)
  ],
  exports: [...declared],
})
export class SharedModule { }
