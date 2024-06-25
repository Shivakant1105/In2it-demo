import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/Shared/custom-cell/custom-cell.component';

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
      orgName: 'Organization',
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
  heading="Organization"
  gridOptions!:GridOptions
  columnDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Org Name',
      field: 'orgName',
      cellStyle: { color: 'blue' },

      cellRenderer:CustomCellComponent
      // cellRenderer: (params: any) => {
      //   const linkElement = document.createElement('a');
      //   linkElement.innerText = params.value;
      //   linkElement.addEventListener('click', (event: Event) => {
      //     event.preventDefault();
      //     this.add(params.data);
      //   });
      //   return linkElement;
      // },
    },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Industry', field: 'industry' },
    { headerName: 'Onboarding', field: 'onboarding' },
    { headerName: 'Related Orgs', field: 'relatedOrgs' },
    { headerName: 'Products', field: 'products' },
    { headerName: 'Org SPOC', field: 'orgSPOC' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
  ];
  rowData: any[] = [];

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.allData.subscribe((data: any) => {
      this.organizations = data;
      this.rowData = this.organizations;
    });
    this.getAllTable();
    const navigation = history.state;
    console.log('contacdat from fd=ata come0', navigation.ne);
    if (navigation.id && navigation.data ) {
      console.log(navigation.id);
      console.log("navigation data:", navigation);

      // Assuming `add` method processes and sets the data to your component's state
      console.log(navigation.data);
      this.add(navigation.data[0]);

      // Assuming `organizations` is a property on your component that needs to be updated
      // this.organizations = navigation.nextData;
      
  }

this.gridOptions={context:{
  parentComponent:this,parent:"Org"
}}
    // if (navigation.data && navigation.id) {
    //   // this.datasource = navigation.data;
    //   console.log(navigation.id);
    //   console.log('conndtaa from', navigation);

    //   this.add(navigation.data);
    //   this.organizations = navigation.nextData;
    //    this.add(navigation.organizations)

    //   console.log();
    // }

    
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
      if (data?.id === id) {
        this.flag = true;
      }
    });
  }

  add(org: any) {
    this.checkExisitingTab(org?.id);
    this.active = org?.id;
    if (!this.flag) {
      this.navs.push(org);
    }
    this.navsData.emit(org);
    console.log('Send Data', org);
  }
  filterData(filterName: any) {
    const filteredOrganizations = this.organizations.filter(
      (data: any) => data.type === filterName
    );
    this.rowData = filteredOrganizations;

    // console.log("gett aak datad", this.showTable);
  }

  getAllTable() {
    this.rowData = this.organizations;
    // console.log("gett aak datad", this.showTable);
  }
}
