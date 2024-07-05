import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css'],
})
export class WorkflowsComponent implements OnInit {
  active = 1;
  organizations: any;
  addCard: boolean = false;
  
  showSideCard: boolean = false;
  selectedRowData: any;

  @Input() workflowData: any;

  cardData!: any;
  contactTable: any;
  columnDefs: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true },
    {
      headerName: 'Name',
      field: 'name',
      cellRenderer: (params: any) => {
        const linkElement = document.createElement('a');

        linkElement.innerText = params.value;
        linkElement.addEventListener('click', (event) => {
          event.preventDefault();
          this.getDataCard(params.data);
        });
        return linkElement;
      },
    },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone Number', field: 'number' },
  ];
  constructor() {}

  ngOnInit() {
    this.organizations = this.workflowData;
    this.contactTable = this.workflowData.contact;
  }

  openSideCard(row: any) {
    this.showSideCard = true;
    this.selectedRowData = row;
  }
  togglebtn() {
    this.addCard = true;
  }

  getDataCard(contact: any) {
    this.togglebtn();
    this.cardData = contact;
  }

  close() {
    this.addCard = false;
  }
}
