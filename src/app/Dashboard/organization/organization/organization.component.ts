import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../service/data.service';
import { log } from 'console';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations = [
    {
      id: 1,
      organization: 'In2it test Org',
      type: 'Customer',
      industry: 'Industry A',
      onboarding: 'Onboarding A',
      relatedOrgs: 'Related Orgs A',
      products: 'Products A',
      orgSPOC: 'Org SPOC A',
      email: 'email@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      organization: 'In2it test Org B',
      type: 'Non-Customer',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
    },
    {
      id: 3,
      organization: 'In2it test Org C',
      type: 'Customer',
      industry: 'Industry C',
      onboarding: 'Onboarding C',
      relatedOrgs: 'Related Orgs C',
      products: 'Products C',
      orgSPOC: 'Org SPOC C',
      email: 'email3@example.com',
      phone: '456-789-0123',
    },
    {
      id: 4,
      organization: 'In2it test Org D',
      type: 'Non-Customer',
      industry: 'Industry D',
      onboarding: 'Onboarding D',
      relatedOrgs: 'Related Orgs D',
      products: 'Products D',
      orgSPOC: 'Org SPOC D',
      email: 'email4@example.com',
      phone: '789-012-3456',
    },
  ];

  @Output() navsData: EventEmitter<any> = new EventEmitter<any>();
workflowData: any

  navs = [
    {
      id: 0,
      organization: 'Organization',
      email: '',
      industry: '',
      onboarding: '',
      orgSPOC: '',
      phone: '',
      products: '',
      relatedOrgs: '',
      type: '',
    },
  ];
  counter = this.navs.length + 1;
  active!: number;
  showTable!: any;
  flag!: boolean;



  


  ngOnInit(): void {
    
    
    this.getAllTable();
  }
  constructor(private dataService:DataService) {}
 
  close(event: MouseEvent, toRemove: number) {
    this.navs.splice(toRemove, 1);
    if(this.navs.length===1){
      this.active=0
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  }
 checkExisitingTab(id: number) {
  this.flag = false;
  this.navs.some((data) => {
    if (data.id === id) {
      this.flag = true;
      return true;
    }
    return false;
  });
}
 
  add(event: MouseEvent, org: any) {
    this.checkExisitingTab(org.id);
   this.active=org.id
    if(!this.flag){
      this.navs.push(org);
      event.preventDefault();
    }
    this.navsData.emit(org);
    console.log('Send Data',org);
  }
 
  filterData(filterName: any) {
    const filteredOrganizations = this.organizations.filter(
      (data) => data.type === filterName
    );
    this.showTable = filteredOrganizations;
  }
  getAllTable() {
    this.showTable = this.organizations;
  }
  // onClickTable() {
    
  //   this.dataService.setTableData(this.organizations);
  // }

  // addDataToSub(){
  //   this.dataService.setTableData(this.organizations);
  // }
 
 
}
 