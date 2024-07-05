import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsListService } from '../../service/products-list.service';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
// import { TableData } from '../../Models/products-list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
 
  searchValue: any;
  heading ="Product-List"
  showColumnList: boolean = false;
  gridApi!: GridApi;
  gridOptions: GridOptions = {
    isRowSelectable: (params) => {
      return !params.data.is_table_exist;
    },
    getRowStyle: (params) => {
      if (params.data.is_table_exist) {
        return { background: '#c1c1c1' };
      }
      return;
    },
  };

  rowData!: any[] ;
  columnDefs: ColDef[] = [
    // {  },
    { headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true, headerName: 'Table Name', field: 'table_name.value' },
    { headerName: 'Table Description', field: 'description.value' },
    {
      headerName: 'Existing in Products List',
      field: 'is_table_exist',
      valueFormatter: this.booleanValueFormatter,
    },
  ];

  constructor(private productService: ProductsListService, private router: Router) {}

  ngOnInit(): void {

    this.productService.getProductsList().subscribe({
      next: (res) => {
        this.rowData = res.data;
        console.log(res);
        // console.log(JSON.parse(data));
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  booleanValueFormatter(params: any): string {
    return params.value ? 'Yes' : 'No';
  }
  
  onGridReady(params: any) {
    this.gridApi = params;

  }

 onSearchData(){
    // console.log("search data", this.gridApi); 
    this.gridApi?.setQuickFilter(this.searchValue)
    
  }


  toggleColumnListVisibility(): void {
    this.showColumnList = !this.showColumnList;
  }

  randomId(){
    const id=Math.floor(Math.random()*1000);
    return id
  }
  currentDate(){
    let date=new Date()
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  allTables:any
  addToList(): void {
    const selectedNodes =
     this.gridOptions.api?.getSelectedNodes();
    const selectedData = selectedNodes?.map(node => node.data);

  
    const existingTables = this.rowData?.filter(data => data.is_table_exist) || [];
 

    const nonExistingTables = selectedData?.filter(data => !data.is_table_exist) || [];

    const createdBy = 'Shiva Kant'; // Assuming 'created_by' is a string

   
    
    nonExistingTables.forEach(table => {
      table.table_id = { value:this.randomId(), is_edit: false, type: 'integer' };
      table.is_table_exist = true;
      table.created_on = { value: this.currentDate(), is_edit: false, type: 'string' };
 
      table.created_by = { value: createdBy, is_edit: false, type: 'many2one' };
    });
    

     this.allTables = [...existingTables, ...nonExistingTables];
    

    this.router.navigate(['/products/product-table'],
       { state: { tables: this.allTables } });
  }
  
  
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
