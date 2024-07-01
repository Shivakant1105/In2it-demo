
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
  // create Deep copy of
  // let updatedData = Object.assign({}, this.params.data);

    let updatedData = JSON.parse(JSON.stringify(this.params.data));
    // shallow copy
    // let updatedData = { ...this.params.data };

    // console.log(updatedData);
    
    updatedData.edit_mode=false
    this.params.data.updateData=updatedData
   
    // console.log(updatedData);
  
  }
  }

  deleteRow() {
    if(this.params.context.parentComponent==='task'){
    this.params.context.parentComponent.onDelete(this.params.data);}
    else{
      // this.params.context.parentComponent.delete(this.params.node.rowIndex);
      this.params.api.applyTransaction({
        remove: [this.params.node.data]
      });
      // delete this.params.data.updateData
 

    }

  }

  confirmEdit() {
  if(this.params.data.addMode){
    delete this.params.data.addMode;
    this.params.data.table_name.value=this.params.data.updateData.table_name.value;
    this.params.data.description.value=this.params.data.updateData.description.value;
    delete this.params.data.updatedData;
    // console.log('formUpdatecheck',this.params)
  }else{
    this.params.data.edit_mode = false; 
 this.params.data.table_name.value=this.params.data.updateData.table_name.value
 this.params.data.description.value=this.params.data.updateData.description.value
 console.log(this.params.data);
 
   delete this.params.data.updateData

    // this.productService.fireLocalListSubject(this.params)
    }

 
  }

  cancelEdit() {


    if(this.params.data.addMode){
      this.params.api.applyTransaction({
        remove: [this.params.node.data]
      });
 
      // this.params.context.parentComponent.rowData.splice(this.params.rowIndex,1)
      console.log('cancel',this.params)
    }else{
 
      this.params.data.edit_mode = false;
    
      delete this.params.data.updateData
      console.log(this.params)
 
    }

  

    // this.params.api.stopEditing(true);
    // this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
  }
}
