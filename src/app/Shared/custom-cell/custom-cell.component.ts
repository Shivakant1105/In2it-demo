import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {  ICellRendererParams } from 'ag-grid-community';
// import { ContactComponent } from 'src/app/Dashboard/organization/contact/contact.component';

@Component({
  selector: 'app-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.css']
})
export class CustomCellComponent implements OnInit,  ICellRendererAngularComp {
 orgName:string=''
 params: any;
 fieldName:string | undefined=''
 contactName:string=""
  constructor(
    // private contactComponent:ContactComponent
    
  ) { }
  agInit(params: ICellRendererParams): void {
    this.contactName=params.data.name
    this.orgName=params.data.orgName
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
    console.log("saf;flj",this.params.data);
    
  }
  deleteTask(){
    this.params.context.parentComponent.onDelete(this.params.data)
  }
  orgNameClick() {
    if(this.params.context.parent=='Org'){
      this.params.context.parentComponent.add(this.params.data)
    }else if(this.params.context.parent=='Contact'){
      const nextData=this.params.context.parentComponent.contactData.filter((data:any)=>{
        return data.id===this.params.data.orgID;
        })
        console.log('nex',nextData)
      this.params.context.parentComponent.openTab( nextData,this.params.data.orgID)
      // this.openTab(params.data,params.data.orgID);
      // this.openForm(params.data, 'checkBox');
      // this.viewDetails(params.data.id);
    }
    console.log(this.params);

    // this.contactComponent.editGrid(this.params);
  }

  contactClick(){
    this.params.context.parentComponent.openForm(this.params.data,'checkBox')
    this.params.context.parentComponent.viewDetails(this.params.data.id)
  }
  
}
