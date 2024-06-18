import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit,  ICellRendererAngularComp {

  params: any;
  fieldName:string | undefined=''

  isEditing: boolean = false;
   constructor(
     // private contactComponent:ContactComponent
     
   ) { }
   agInit(params: ICellRendererParams): void {
  
     this.params=params
     this.fieldName=params.colDef?.field
     // console.log('params data',params)
   }
   refresh(params: ICellRendererParams) {
     this.params=params
     return true;
   }
 
   ngOnInit(): void {
   }
   editTask () {
     // alert("clicked");addTask
     
     this.params.context.parentComponent.onEdit(this.params.data)
     this.params.context.parentComponent.addTask()
     // this.params.onClick(this.params)
     // console.log("saf;flj",this.params.data);
 
   }
   editedRowIndex: number | null = null;
   onEditClick() {
     this.isEditing = true;
     this.params.context.parentComponent.startEditing(this.params.rowIndex, this.params);
    //  if (this.editedRowIndex !== null) {
    //   this.params.api.stopEditing();
    // }
  
    // Start editing the selected row
    // this.editedRowIndex = this.params.rowIndex;
    // this.params.api.startEditingCell({
    //   rowIndex: this.params.rowIndex,
    //   colKey: 'table_name.value',
    // });
    //   const selectedRow = this.params.api.getSelectedNodes();
    //   selectedRow.forEach((node:any) => {
    //   this.params.api.startEditingCell({
    //     rowIndex: node.rowIndex,
    //     colKey: 'table_name.value',
    //   });
    // });
     // this.params.api.startEditingCell({
     //       rowIndex: this.params.rowIndex,
     //     colKey:"table_name.value"})
     // // this.params.context.parentComponent.startEditingCell(this.params.node.field)
    //  this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
     
   }
 
   deleteRow(): void {
     // const rowData = this.params.data;
     // this.params.api.applyTransaction({ remove: [rowData] });
     this.isEditing = true;
     this.params.context.parentComponent.delete(this.params.data)
 
     console.log(this.params);
     
   }
   confirmEdit(): void {
     this.isEditing = false;
     this.params.api.stopEditing(false);
     this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
     this.params.context.parentComponent.saveData(this.params.node.data);
   }
 
   cancelEdit(): void {
     this.isEditing = false;
     this.params.api.stopEditing(true);
     this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
   }
 
   // // startEdit() {
   // //   this.isEditing = true;
   // //   this.params.context.parentComponent.editRow(this.params)
   // //   // Your logic to handle the start of editing
   // // }
   // onEditClick(): void {
   //   this.isEditing = true;
   //   // const value = this.params.api.getValue(this.params.node, this.params.data.table_name.value);
   //   // console.log( this.params.data.table_name.value);
   //   // console.log(value);
   //   this.params.context.parentComponent.startEditingCell(this.params.rowIndex, this.params.data.table_name.value); 
   //   console.log(this.params.rowIndex);
   // }
   
   
   // confirmEdit() {
   //   this.isEditing = false;
   //   // Your logic to handle the confirmation of editing onBtStopEditing
   // }
 
   // cancelEdit() {
   //   this.isEditing = false;
   //   this.params.context.parentComponent.onBtStopEditing(); 
 
   //   // Your logic to handle the cancellation of editing
   // }
 
   // deleteRow() {
   //   // Your logic to handle task deletion
   // }
   deleteTask(){
     this.params.context.parentComponent.onDelete(this.params.data)
   }
 
 
   
 }
 