
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions, } from 'ag-grid-community';
// import { TableData } from 'src/app/Dashboard/Models/products-list';



@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  gridApiActive: any;
  gridColumnApi!: any;
  searchValue: any

 
  constructor() { }

  gridApi!: GridApi
  defaultColumnDefs: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    suppressMovable: true,
    // enableRowGroup: true, enablePivot: true,
    flex: 1,
    minWidth: 80,


  };

  editType: 'fullRow' = 'fullRow'
  public rowSelection: "single" | "multiple" = "multiple";
  @Input() rowData: any;
  @Output() checkBoxChange: EventEmitter<any> = new EventEmitter();
  @Output() GridReady: EventEmitter<any> = new EventEmitter<GridApi>();
  @Input() columnDefs!: ColDef[];

  @Input() showColumnList:boolean = false;
  // @Input()editType:any
  @Input() gridOptions!: GridOptions
colDeflist!:ColDef[]
  onCellClicked(event: any) {
    console.log(event);

    // this.cellClicked.emit(event);
  }
  ngOnInit() {
    // console.log('rowdata',this.rowData)
    // console.log('coldef',this.columnDefs)
this.colDeflist=this.columnDefs
this.colDeflist.map((item)=>{
  item.hide=false
  return item
})
    // setTimeout(() => {
    //   this.gridOptions.api?.sizeColumnsToFit()

    // }, 0)

  }

  onGridReady(params: any) {
    // this.gridApiActive = params.api
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.GridReady.emit(this.gridApi)
    this.GridReady.emit(this.gridColumnApi)
    // this.rowData
    // console.log("search data" ,this.rowData);
    // console.log("grid ready");

  }


 

  onCheckBoxChange() {
    const selectedRow = this.gridOptions.api?.getSelectedRows()
    // console.log(selectedRow)
    this.checkBoxChange.emit(selectedRow)
  }

  toggleColumnVisibility(col:any ) {
console.log(this.colDeflist);
      if (!col.hide) {
    
       this.gridOptions.columnApi?.setColumnVisible(col.field,false)
       col.hide=true

      }
      else{
        this.gridOptions.columnApi?.setColumnVisible(col.field,true)
       col.hide=false
      }
  }


}

// toggleColumnVisibility(): void {
//   const columnState = this.gridColumnApi.getColumnState();
//   const colIds = this.columnDefs.map(col => col.field);

//   columnState.forEach((col: any) => {
//     if (colIds.includes(col.colId)) {
//       col.hide = !col.hide;
//     }
//   });

//   this.gridColumnApi.applyColumnState({ state: columnState, applyOrder: true });
// }