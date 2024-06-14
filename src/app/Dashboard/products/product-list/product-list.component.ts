import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

import { ProductsListService } from '../../service/products-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  gridOptions: GridOptions = {
    // rowSelection: 'multiple',
    isRowSelectable: (params) => {
      return !params.data.is_table_exist;
    },
    getRowStyle: (params) => {
      if (params.data.is_table_exist) {
        return{ background: '#c1c1c1' };
      }
      return;
    },
    
  };

  rowData: any[] = [];
  columnDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,

      showDisabledCheckboxes: true,
    },
    // { headerName: 'Table id', field: 'table_id.value',  },
    { headerName: 'Table Name', field: 'table_name.value' },
    { headerName: 'Table Description', field: 'description.value' },
    {
      headerName: 'Existing in Products List',
      field: 'is_table_exist',
      valueFormatter: this.booleanValueFormatter,
    },
  
  ];

  constructor(private productService: ProductsListService) {}

  ngOnInit(): void {
    this.productService.getProductsList().subscribe(
      (data) => {
        this.rowData = data.resData.data;

        console.log(this.rowData);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  booleanValueFormatter(params: any): string {
    return params.value ? 'Yes' : 'No';
  }

  isRowSelectable = (params: any): boolean => {
    return !params.data.is_table_exist;
  };
}
