import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  rowData: any[] = [
    {
      "table_id": {
          "value": 838,
          "is_edit": false,
          "type": "integer"
      },
      "table_type": {
          "value": "is_standard",
          "is_edit": false,
          "type": "boolean"
      },
      "table_name": {
          "value": "Service Component Config Option",
          "is_edit": true,
          "type": "char"
      },
      "description": {
          "value": "Service Component Config Option",
          "is_edit": true,
          "type": "char"
      },
      "attribute_count": {
          "value": 7,
          "is_edit": false,
          "type": "integer"
      },
      "rows_count": {
          "value": 0,
          "is_edit": false,
          "type": "integer"
      },
      "created_on": {
          "value": "26/08/2023",
          "is_edit": false,
          "type": "datetime"
      },
      "created_by": {
          "value": "Gaurav Rautela",
          "is_edit": false,
          "type": "many2one"
      },
      "updated_on": {
          "value": "26/08/2023",
          "is_edit": false,
          "type": "datetime"
      },
      "updated_by": {
          "value": "Gaurav Rautela",
          "is_edit": false,
          "type": "many2one"
      },
      "is_standard": {
          "value": true,
          "is_edit": false,
          "type": "boolean"
      },
      "is_active": {
          "value": true,
          "is_edit": false,
          "type": "boolean"
      },
      "property": {
          "is_edit": true,
          "is_delete": true
      },
      "related_table": [
          {
              "id": 96,
              "name": "Users"
          },
          {
              "id": 96,
              "name": "Users"
          }
      ]
    }
  ];
  columnDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
    
    },
    { headerName: 'Table Name', field: 'table_name.value' },
    { headerName: 'Table Description', field: 'description.value' },
    { headerName: 'Existing in Products List', field: 'existing' }
  ]
  constructor() { }



  ngOnInit(): void {
  }

}
