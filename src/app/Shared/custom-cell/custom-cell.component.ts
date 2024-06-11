import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {  ICellRendererParams } from 'ag-grid-community';
import { ContactComponent } from 'src/app/Dashboard/organization/contact/contact.component';

@Component({
  selector: 'app-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.css']
})
export class CustomCellComponent implements OnInit,  ICellRendererAngularComp {
 value:string=''
 params: any;
  constructor(private contactComponent:ContactComponent) { }
  agInit(params: ICellRendererParams): void {
    this.value=params.value
    this.params=params
  }
  refresh(params: ICellRendererParams) {
    this.params=params
    return true;
  }

  ngOnInit(): void {
  }
  nameClicked () {
    alert("clicked");
    // this.params.onClick(this.params)
    console.log("saf;flj",this.value);
    
  }

  onActionClick() {
    console.log(this.params);
   
    this.contactComponent.editGrid(this.params);
  }
  
}
