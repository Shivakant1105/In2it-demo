import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../service/data.service';
import { log } from 'console';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  @Output() navsData: EventEmitter<any> = new EventEmitter<any>();
  // workflowData: any

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
  organizations: any;
  counter = this.navs.length + 1;
  active!: number;
  showTable!: any;
  flag!: boolean;

  constructor(private dataService: DataService) {

    
  


  }
  ngOnInit(): void {
    this.dataService.allData.subscribe((data: any) => {
      this.organizations = data;
    });
    this.getAllTable();
    const navigation = history.state;
    if ( navigation.data && navigation.id) {
      // this.datasource = navigation.data;
  
     this.add(navigation, navigation.data)
    }
   
  }

  close(event: MouseEvent, toRemove: number) {
    this.navs.splice(toRemove, 1);
    // if(this.navs.length===1){
    //   this.active=0
    // }
    this.active = 0;
    // this.active=toRemove-1
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  checkExisitingTab(id: number) {
    this.flag = false;
    this.navs.some((data) => {
      if (data.id === id) {
        this.flag = true;
      }
    });
  }

  // add(event: MouseEvent, org: any) {
  //   this.checkExisitingTab(org.id);
  //   this.active = org.id;
  //   if (!this.flag) {
  //     this.navs.push(org);
  //     event.preventDefault();
  //   }
   
  //   this.navsData.emit(org);
  //   console.log('Send Data', org);
  // }
  add(event: MouseEvent, org: any) {
    this.checkExisitingTab(org.id);
    this.active = org.id;
    if (!this.flag) {
      this.navs.push(org);
      // // Add router navigation
      // const navigationExtras: NavigationExtras = {
      //   relativeTo: this.route,
      //   queryParams: { id: org.id }, // You can modify this as per your routing needs
      //   // You can add more navigation options here if needed
      // };
      // this.router.navigate([], navigationExtras);
      // event.preventDefault();
    }
    this.navsData.emit(org);
    console.log('Send Data', org);
  }
  filterData(filterName: any) {
    const filteredOrganizations = this.organizations.filter(
      (data: any) => data.type === filterName
    );
    this.showTable = filteredOrganizations;
    // console.log("gett aak datad", this.showTable);
  }

  getAllTable() {
    this.showTable = this.organizations;
    // console.log("gett aak datad", this.showTable);
  }
}
