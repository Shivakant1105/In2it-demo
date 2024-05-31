import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../service/data.service';
interface Item {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-human-task',
  templateUrl: './human-task.component.html',
  styleUrls: ['./human-task.component.css'],
})
export class HumanTaskComponent implements OnInit {
  constructor( private dataService:DataService) {}
  organizationDetails: any;
  ngOnInit(): void {

   
  }
  
 
  activeTab: string = 'organizations';
  selectedItem: any;
  navs = [0];
  counter = this.navs.length + 1;
  active: number | undefined;
 
  organizations = [
    {Id:1,
      orgName: 'Organization A',
      type: 'Customers',
      industry: 'Industry A',
      onboarding: 'Onboarding A',
      relatedOrgs: 'Related Orgs A',
      products: 'Products A',
      orgSPOC: 'Org SPOC A',
      email: 'email@example.com',
      phone: '123-456-7890',
    },
    {Id:2,
      orgName: 'Organization B',
      type: 'Non-Customers',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
    },
    {Id:3,
      orgName: 'Organization B',
      type: 'Non-Customers',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
    },
    // Add more organizations as needed
  ];

  openTab(tab: string) {
    this.activeTab = tab;
  }

  showDetails(item: Item) {
    this.selectedItem = item;
  }
  trackById(index: number, item: any): number {
    return index;
}


  close(event: MouseEvent, toRemove: number) {
    this.navs = this.navs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }


  add(event: MouseEvent, organizations: any) {

    if (!this.navs.includes(organizations)) {
      this.navs.push(organizations);
      console.log(this.organizations);
      
    }
    
    event.preventDefault();
  }
  
  
}
