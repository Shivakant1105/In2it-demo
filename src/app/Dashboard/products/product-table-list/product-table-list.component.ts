import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../service/products-list.service';

import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';
import { InputRendererComponent } from 'src/app/Shared/input-renderer/input-renderer.component';

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
    { headerName: 'Table Id', field: 'table_id.value' ,},
    { headerName: 'Table Name', field: 'table_name.value',  cellRenderer:InputRendererComponent ,},
    { headerName: 'Table Description', field: 'description.value',  cellRenderer:InputRendererComponent },
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
      // cellRendererParams: {
      //   context: { isEditing: false, parentComponent: this }
      // }
    },
  ];

  constructor(private productService: ProductsListService) {}

  ngOnInit(): void {
    this.rowData = window.history.state.tables;
    const stateData = window.history.state.tables;
    if (!stateData) {
      this.productService.getProductsList().subscribe(
        (res) => {
          this.rowData = res.data.filter((row:any) => row.is_table_exist);
         
           this.rowData=this.rowData.map(item => {
            return { ...item, edit_mode: false };})
            console.log(this.rowData);
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
 

    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'Products list',
        
      },
   
    suppressCellFocus:true,
      suppressClickEdit :true,
      stopEditingWhenCellsLoseFocus: true
    };
   
  }

  onGridReady(params: any) {
    this.gridApi = params;
    this.gridColumnApi = params.columnApi;
    // console.log(this.gridApi);
    // console.log( "parmas",params);
    

  }
  // updateData(updatedData: any) {
  //   const index = this.rowData.findIndex(item => item.table_id.value === updatedData.table_id.value);
  //   if (index > -1) {
  //     this.rowData[index] = updatedData;
  //     // Refresh the grid data
  //     this.rowData = [...this.rowData];
  //   }
  //   console.log("da");
    
  // }
  deleteRow(rowIndex: number) {
    this.rowData.splice(rowIndex, 1);
    this.rowData = [...this.rowData]; // Refresh the grid
  }
  }
  // startEditing(_rowIndex: number, _colKey: string) {
  //   // this.gridApi.startEditingCell({ rowIndex, colKey });
  // }

  // stopEditing() {
  // //   this.gridApi.stopEditing();
  // // }

  //

  // startEditing(rowIndex: number, colKey: string) {
  //   this.gridApi.startEditingCell({ rowIndex, colKey });
  // }

  // stopEditing() {
  //   this.gridApi.stopEditing();
  // }

  // delete(data: any) {
  //   this.gridApi.applyTransaction({ remove: [data] });
  // }




  // isCurrentRowEditing:any
//  editingCells = this.gridApi.getEditingCells();
//   // checks if the rowIndex matches in at least one of the editing cells
//  isCurrentRowEditing = this.editingCells.some((cell:any) => {
//     return cell.rowIndex === this.gridApi;
 
    
//   })

  // startEditing(rowIndex: any, ) {
  //   this.gridApi.setFocusedCell(rowIndex, 'table_name.value');
  //   this.gridApi.startEditingCell({
  //     rowIndex: rowIndex,
  //     colKey: 'table_name.value'
  //   });

    // console.log("edit row index",rowIndex);
    // console.log("edit  data",rowData);
    
  // }

  // stopEditing() {
  //   this.gridApi.stopEditing(true);
  // }

  // delete(rowIndex: any) {

  //   this.gridApi.applyTransaction({ remove: [rowIndex] });
  // }
  // saveData(_id: number, _data: any) {
    // this.productService.updateTableData(id,).subscribe(
    //   (response) => {
    //     console.log('Data saved successfully', response);
    //   },
    //   (error) => {
    //     console.error('Error saving data', error);
    //   }
    // );
  // }
// }
// 