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

    
    this.productService.getProductsList().subscribe(
      (res) => {
        this.rowData =res.data;
        console.log(res);
  //  console.log(JSON.parse(data));

      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  booleanValueFormatter(params: any): string {
    return params.value ? 'Yes' : 'No';
  }
  
  onGridReady(params: any) {
    this.gridApi = params;
   
    console.log(this.gridApi);
    console.log( "parmas",params);
    

  }

 onSearchData(){
    // console.log("search data", this.gridApi); 
    this.gridApi?.setQuickFilter(this.searchValue)
    
  }


  toggleColumnListVisibility(): void {
    this.showColumnList = !this.showColumnList;
    console.log("tooglrr");
  }
  
  addToList(): void {
    const selectedNodes =
     this.gridOptions.api?.getSelectedNodes();
    const selectedData = selectedNodes?.map(node => node.data);
    console.log('Selected nodes:', selectedNodes);
    console.log('Selected data:', selectedData);
    // this.productService.getProductsList().subscribe(
    //   (data) => {
    //     this.rowData = data.resData.data.filter(row => row.is_table_exist);


    //     console.log("123",this.rowData);
    //   },)
      console.log("existingTables",this.rowData);
    const existingTables = this.rowData?.filter(data => data.is_table_exist) || [];
    console.log("existingTables",this.rowData);

    const nonExistingTables = selectedData?.filter(data => !data.is_table_exist) || [];

    const createdBy = 'Shiva Kant'; // Assuming 'created_by' is a string

    function formatDate(date: Date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    }
    
    nonExistingTables.forEach(table => {
      table.table_id = { value: Math.floor(Math.random() * 1000), is_edit: false, type: 'integer' };
      table.is_table_exist = true;
      table.created_on = { value: formatDate(new Date()), is_edit: false, type: 'datetime' };
    // Assigns current date in dd/mm/yyyy format
      table.created_by = { value: createdBy, is_edit: false, type: 'many2one' };
    });
    

    const allTables = [...existingTables, ...nonExistingTables];
    console.log('Existing tables:', existingTables);
    console.log('All tables:', allTables);

    this.router.navigate(['/products/product-table'], { state: { tables: allTables } });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
