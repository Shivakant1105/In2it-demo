import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { Subscription } from "rxjs";

@Component({
  selector: "app-action-button",
  templateUrl: "./action-button.component.html",
  styleUrls: ["./action-button.component.css"],
})
export class ActionButtonComponent implements OnInit, ICellRendererAngularComp {
  params: any;
  fieldName: string | undefined = "";
  editStateSubscription!: Subscription;

  constructor() {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.fieldName = params.colDef?.field;
    //  console.log('params data',params)
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }

  ngOnInit(): void {}

  //   My Task component
  onEditClick() {
    if(this.params.context.parentComponent==='task'){
      this.params.context.parentComponent.onEdit(this.params.data);
      this.params.context.parentComponent.addTask();
    }
  else{
  console.log("dtaa",this.params.data);
  this.params.data.edit_mode = true;
    let updatedData = JSON.parse(JSON.stringify(this.params.data));
    console.log(updatedData);
    
    updatedData.edit_mode=false
    this.params.data.updateData=updatedData
   
    // console.log(updatedData);
  
  }
  }

  deleteRow() {
    if(this.params.context.parentComponent==='task'){
    this.params.context.parentComponent.onDelete(this.params.data);}
    else{
      this.params.context.parentComponent.deleteRow(this.params.node.rowIndex);

      delete this.params.data.updateData
    

    }

  }

  confirmEdit() {

  //   if (this.params.data.updateData) {
  //     Object.assign(this.params.data, this.params.data.updateData);
  //     // delete this.params.data.updateData; 
  //     console.log(this.params.data);
      
  // }
  this.params.data.edit_mode = false; 
 this.params.data.table_name.value=this.params.data.updateData.table_name.value
 this.params.data.description.value=this.params.data.updateData.description.value
 console.log(this.params.data);
 
   delete this.params.data.updateData
  }

  cancelEdit() {
    this.params.data.edit_mode = false;
    
    delete this.params.data.updateData

    // this.params.api.stopEditing(true);
    // this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
  }
}
