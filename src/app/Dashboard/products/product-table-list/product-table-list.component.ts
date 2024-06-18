import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../service/products-list.service';

import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';

@Component({
  selector: 'app-product-table-list',
  templateUrl: './product-table-list.component.html',
  styleUrls: ['./product-table-list.component.css']
})
export class ProductTableListComponent implements OnInit {
  gridOptions!: GridOptions;
  rowData: any[] = [];
  gridApi!: GridApi;
  gridColumnApi: any;

  columnDefs: ColDef[] = [
    { headerName: 'Table Id', field: 'table_id.value' },
    { headerName: 'Table Name', field: 'table_name.value',  editable: true, },
    { headerName: 'Table Description', field: 'description.value',  editable: true, },
    { headerName: 'Created On', field: 'created_on.value' },
    { headerName: 'Created By', field: 'created_by.value' },
    { headerName: 'Updated On', field: 'updated_on.value' },
    { headerName: 'Updated By', field: 'updated_by.value' },
    {
      headerName: 'Action',
      field: 'actions',
      cellRenderer: ActionButtonComponent,
      // editable: false,
      colId: 'actions',
    },
  ];

  constructor(private productService: ProductsListService) {}

  ngOnInit(): void {
    this.rowData = window.history.state.tables;
    const stateData = window.history.state.tables;
    if (!stateData) {
      this.productService.getProductsList().subscribe(
        (data) => {
          this.rowData = data.resData.data.filter(row => row.is_table_exist);
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
    // console.log(this.isCurrentRowEditing);
    console.log(this.gridApi);
    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'Products list',
      },
      suppressClickEdit :true
    };
   
  }

  onGridReady(params: any) {
    this.gridApi = params;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridApi);
    

  }

  // isCurrentRowEditing:any
//  editingCells = this.gridApi.getEditingCells();
//   // checks if the rowIndex matches in at least one of the editing cells
//  isCurrentRowEditing = this.editingCells.some((cell:any) => {
//     return cell.rowIndex === this.gridApi;
 
    
//   })

  startEditing(rowIndex: any, _field: any) {
    this.gridApi.setFocusedCell(rowIndex, 'table_name.value');
    this.gridApi.startEditingCell({
      rowIndex: rowIndex,
      colKey: 'table_name.value'
    });

    console.log("edit row index",rowIndex);
    
  }

  stopEditing(cancel = false) {
    this.gridApi.stopEditing(cancel);
  }

  // deleteRow(rowIndex: any) {
  //   const rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex);
  //   this.gridApi.applyTransaction({ remove: [rowNode.data] });
  // }
}
