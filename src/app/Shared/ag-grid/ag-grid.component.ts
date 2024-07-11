import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
// import { TableData } from 'src/app/Dashboard/Models/products-list';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
})
export class AgGridComponent implements OnInit {
  gridApiActive: any;
  gridColumnApi!: any;
  searchValue: any;

  constructor() {}

  gridApi!: GridApi;
  defaultColumnDefs: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    suppressMovable: true,

    flex: 1,
    minWidth: 80,
  };

  editType: 'fullRow' = 'fullRow';
  public rowSelection: 'single' | 'multiple' = 'multiple';
  @Input() rowData: any;
  @Output() checkBoxChange: EventEmitter<any> = new EventEmitter();
  @Output() GridReady: EventEmitter<any> = new EventEmitter<GridApi>();
  @Input() columnDefs!: ColDef[];

  @Input() showColumnList: boolean = false;

  @Input() gridOptions!: GridOptions;
  colDeflist!: ColDef[];
  ngOnInit() {
    this.colDeflist = this.columnDefs;
    this.colDeflist.map((item) => {
      item.hide = false;
      return item;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;

    this.GridReady.emit(this.gridApi);
  }

  onCheckBoxChange() {
    const selectedRow = this.gridOptions.api!.getSelectedRows();

    this.checkBoxChange.emit(selectedRow);
  }

  toggleColumnVisibility(col: any) {
    if (!col.hide) {
      this.gridOptions.columnApi!.setColumnVisible(col.field, false);
      col.hide = true;
    } else {
      this.gridOptions.columnApi!.setColumnVisible(col.field, true);
      col.hide = false;
    }
  }
}
