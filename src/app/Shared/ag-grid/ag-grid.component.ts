
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions,  } from 'ag-grid-community';



@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  gridApiActive: any;


  searchValue:any
  constructor() { }
  
  //  gridApi!: GridApi
  defaultColumnDefs: ColDef={
    sortable:true,
    filter:true,
  };

  public rowSelection: "single" | "multiple" = "multiple";
  @Input() rowData: any;
  @Output() checkBoxChange: EventEmitter <any> =new EventEmitter();
  @Output() GridReady: EventEmitter <any> =new EventEmitter<GridApi>();
  @Input() columnDefs!: ColDef[];

  @Input() gridOptions!: GridOptions 

  onCellClicked(event: any) {
    console.log(event);
   
    // this.cellClicked.emit(event);
  }
  ngOnInit() {
    // console.log('rowdata',this.rowData)
    // console.log('coldef',this.columnDefs)

    setTimeout(() => {
      this.gridOptions.api?.sizeColumnsToFit()
    }, 0)
    
  }

  onGridReady(params:any){
    this.gridApiActive=params.api
  this.GridReady.emit(this.gridApiActive)
// this.rowData
// console.log("search data" ,this.rowData);
console.log("grid ready");

  }


onCheckBoxChange()
 {
  const selectedRow=this.gridOptions.api?.getSelectedRows()
  // console.log(selectedRow)
 this.checkBoxChange.emit(selectedRow) 
 }

 
}