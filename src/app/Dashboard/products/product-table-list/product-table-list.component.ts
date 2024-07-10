import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../service/products-list.service';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';
import { InputRendererComponent } from 'src/app/Shared/input-renderer/input-renderer.component';
import { TableData } from '../../Models/products-list';

@Component({
  selector: 'app-product-table-list',
  templateUrl: './product-table-list.component.html',
  styleUrls: ['./product-table-list.component.css'],
})
export class ProductTableListComponent implements OnInit {
  gridOptions!: GridOptions;
  searchValue: any;
  rowData: any[] = [];
  gridApi!: GridApi;
  gridColumnApi: any;
  heading = 'Product-table-list';
  showColumnList: boolean = false;
  columnDefs: ColDef[] = [
    { headerName: 'Table Id', field: 'table_id.value' },
    {
      headerName: 'Table Name',
      field: 'table_name.value',
      cellRenderer: InputRendererComponent,
    },
    {
      headerName: 'Table Description',
      field: 'description.value',
      cellRenderer: InputRendererComponent,
    },
    { headerName: 'Created On', field: 'created_on.value' },
    { headerName: 'Created By', field: 'created_by.value' },
    { headerName: 'Updated On', field: 'updated_on.value' },
    { headerName: 'Updated By', field: 'updated_by.value' },
    {
      headerName: 'Action',
      field: 'actions',
      cellRenderer: ActionButtonComponent,
    },
  ];

  constructor(private productService: ProductsListService) {}

  ngOnInit(): void {
    this.rowData = window.history.state.tables;
    const stateData = window.history.state.tables;
    if (!stateData) {
      this.productService.getProductsList().subscribe({
        next: (res) => {
          this.rowData = res.data
            .filter((row: any) => row.is_table_exist)
            .map((item: any) => ({ ...item, edit_mode: false }));

          console.log(this.rowData);
        },
        error: (error) => {
          console.error('Error fetching products', error);
        },
      });
    }

    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'Products list',
      },
      suppressCellFocus: true,
      suppressClickEdit: true,
      stopEditingWhenCellsLoseFocus: true,
    };
  }

  onGridReady(params: any) {
    this.gridApi = params;
    this.gridColumnApi = params;
  }

  onSearchData() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  toggleColumnListVisibility(): void {
    this.showColumnList = !this.showColumnList;
  }

  randomId() {
    const id = Math.floor(Math.random() * 1000);
    return id;
  }

  currentDate() {
    let date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  addRow() {
    let addProductList: TableData = {
      addMode: true,
      table_id: { value: this.randomId(), is_edit: false, type: 'string' },
      table_type: { value: '', is_edit: true, type: 'string' },
      table_name: { value: '', is_edit: true, type: 'string' },
      description: { value: '', is_edit: false, type: 'string' },
      attribute_count: { value: 0, is_edit: false, type: 'string' },
      rows_count: { value: 0, is_edit: false, type: 'string' },
      created_on: { value: this.currentDate(), is_edit: false, type: 'string' },
      created_by: { value: 'Shiva Kant', is_edit: false, type: 'string' },
      updated_on: { value: '', is_edit: false, type: 'string' },
      updated_by: { value: '', is_edit: false, type: 'string' },
      is_standard: { value: false, is_edit: false, type: 'string' },
      is_active: { value: true, is_edit: false, type: 'string' },
      property: { is_edit: false, is_delete: false },
      is_table_exist: undefined,
      related_table: [],
      total_record: 0,
      status: false,
      message: '',
      updateData: '',
    };

    let updated_data = JSON.parse(JSON.stringify(addProductList));
    this.gridOptions.api?.applyTransaction({ add: [addProductList] });
    addProductList.updateData = updated_data;
    this.gridOptions.context.parentComponent.rowData.push(addProductList);
  }
}
