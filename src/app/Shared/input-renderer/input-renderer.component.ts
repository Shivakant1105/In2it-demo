import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-input-renderer',
  templateUrl: './input-renderer.component.html',
  styleUrls: ['./input-renderer.component.css']
})
export class InputRendererComponent implements OnInit,  ICellRendererAngularComp {

  value: any;
    fieldName:string | undefined=''
    isEditing: boolean = false

  constructor() { }
  agInit(params: ICellRendererParams): void {
  
    this.value=params.value
    this.fieldName=params.colDef?.field
    this.isEditing = params.context.isEditing
    // console.log('params data',this.fieldName)

  }
  refresh(params: ICellRendererParams) {
    this.value=params.value
    this.isEditing = params.context.isEditing 
    return true;
  }

  ngOnInit(): void {
    console.log(this.value);
    
  }

}
