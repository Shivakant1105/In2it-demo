import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit  {
  
org: any;

 
	active = 1;
 
  id?: number; 
  workflowData: any;
  organizations: any=[{
    id: 0,
    organization: '',
    email: '',
    industry: '',
    onboarding: '',
    orgSPOC: '',
    phone: '',
    products: '',
    relatedOrgs: '',
    type: '',
  },];

  // @Input() workflowData: any;


  constructor() {
 
   }

  ngOnInit() {
  
    console.log(this.workflowData);
    
  }

  showData(){
    console.log('showdat',this.organizations)
  }
}
