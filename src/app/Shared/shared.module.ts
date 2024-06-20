import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CustomCellComponent } from './custom-cell/custom-cell.component';
import { FormsModule } from '@angular/forms';
import { ActionButtonComponent } from './action-button/action-button.component';
import { InputRendererComponent } from './input-renderer/input-renderer.component';



const declared = [
  AgGridComponent, CustomCellComponent
  
];
@NgModule({
  declarations:[...declared, ActionButtonComponent, InputRendererComponent, ],
  imports: [
    CommonModule,AgGridModule, FormsModule,FeatherModule.pick( allIcons)
  ],
  exports: [...declared],
})
export class SharedModule { }
