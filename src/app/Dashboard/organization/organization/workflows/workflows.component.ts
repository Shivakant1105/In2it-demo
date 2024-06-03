import { Component, Input, OnInit } from '@angular/core';

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
  contactData: any;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    // this.organizations = this.workflowData;
    console.log(this.workflowData);
    this.dataService.allData.subscribe(() => {
      // this.contactData = data;
      this.organizations = this.workflowData;
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
     this.cardData=contact
// console.log("card dada,====>",this.cardData);

    // const data = this.organizations.contact.filter((res: any) => {
    //   return res.i === index;
    // });

    // console.log("caardadta", data);
    
    // this.cardData = data[1];
    // console.log('cardffg', this.cardData);
  }

  close() {
    this.addCard = false;
  }
}
