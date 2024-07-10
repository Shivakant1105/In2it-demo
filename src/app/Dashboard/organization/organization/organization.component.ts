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
  heading = 'Organization';
  gridOptions!: GridOptions;
  columnDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Org Name',
      field: 'orgName',
      cellStyle: { color: 'blue' },

      cellRenderer: CustomCellComponent,
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
  ngOnInit() {
    this.dataService.allData.subscribe((data: any) => {
      this.organizations = data;
      this.rowData = this.organizations;
    });
    this.getAllTable();
    const navigation = history.state;

    if (navigation && navigation.data) {
      this.add(navigation.data[0]);
    }

    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'Org',
      },
    };
  }

  close(event: MouseEvent, toRemove: number) {
    this.navs.splice(toRemove, 1);
    this.active = 0;
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

  add(org: any) {
    this.checkExisitingTab(org.id);
    this.active = org.id;
    if (!this.flag) {
      this.navs.push(org);
    }
    this.navsData.emit(org);
  }
  filterData(filterName: any) {
    const filteredOrganizations = this.organizations.filter(
      (data: any) => data.type === filterName
    );
    this.rowData = filteredOrganizations;
  }

  getAllTable() {
    this.rowData = this.organizations;
  }
}
