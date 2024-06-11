import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { DataService } from 'src/app/Dashboard/service/data.service';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css'],
})
export class WorkflowsComponent implements OnInit {
  // org: any;

  active = 1;
  organizations: any;
  addCard: boolean = false;
  @Input() workflowData: any;


  cardData!:any;
  contactTable: any;
  columnDefs: ColDef[] = [
    
    {headerCheckboxSelection: true, 
      checkboxSelection: true, 
     
    },
    { headerName: 'Name', field: 'name',   
      cellRenderer: (params: any) => {
      const linkElement = document.createElement('a');

      linkElement.innerText = params.value;
      linkElement.addEventListener('click', (event) => {
        event.preventDefault();
        this.getDataCard(params.data);

        console.log("ajkhfjhdjkshfd")
      });
      return linkElement;
    }, },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone Number', field: 'number' }
  ];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    // this.organizations = this.workflowData;
    console.log("contqafrta",this.workflowData.contact);
    this.dataService.allData.subscribe((data:any) => {
   
      this.organizations = this.workflowData;
    console.log(data);
    this.contactTable=this.workflowData.contact
    console.log(this.contactTable,"dfsaGG");
    
    });
  }

  showSideCard: boolean = false;
  selectedRowData: any;

  openSideCard(row: any) {
    this.showSideCard = true;
    this.selectedRowData = row;
  }
  togglebtn() {
    this.addCard = true;
  }

  getDataCard(contact:any) {
    this.togglebtn();
     this.cardData=contact;
  }

  

  close() {
    this.addCard = false;
  }
}
