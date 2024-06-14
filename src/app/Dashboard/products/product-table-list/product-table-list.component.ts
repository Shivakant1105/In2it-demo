import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../service/products-list.service';
import { CustomCellComponent } from 'src/app/Shared/custom-cell/custom-cell.component';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-product-table-list',
  templateUrl: './product-table-list.component.html',
  styleUrls: ['./product-table-list.component.css']
})
export class ProductTableListComponent implements OnInit {
  gridOptions!: GridOptions
  rowData: any[] = [];
  columnDefs: ColDef[] = [

    { headerName: 'Table Id', field: 'table_id.value',  },
      { headerName: 'Table Name', field: 'table_name.value' , editable:true},
      { headerName: 'Table Description', field: 'description.value' ,editable:true },
    {
      headerName: 'Created On',
      field: 'created_on.value',
    
    },
    {
      headerName: 'Created By',
      field: ' created_by.value',
    
    },
    {
      headerName: 'Updated On',
      field: 'updated_on.value',
    
    },
    {
      headerName: 'Updated By',
      field: '  updated_by.value',
    
    },
  
    {
      headerName: 'Action',
      field: 'actions',
      cellRenderer: CustomCellComponent,
    },
  ];

  constructor(private productService: ProductsListService) {}

  ngOnInit(): void {
    this.productService.getProductsList().subscribe(
      (data) => {
        // this.rowData = data.resData.data;
        this.rowData = data.resData.data.filter(row => row.is_table_exist);
        console.log(this.rowData);
        console.log(this.rowData);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );

    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'Products list',
      },
    };
  }

  editRow(params:any){
    console.log("edit",params);
    
  }
}
