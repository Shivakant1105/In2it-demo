import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

// import { Observable, map, of, startWith } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { CustomCellComponent } from 'src/app/Shared/custom-cell/custom-cell.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DecimalPipe],
})
export class ContactComponent implements OnInit {
  filteredRowData!: any[];

  organizations: any;
  contactData!: any[];
  addData: boolean = false;
  searchValue: any;
  totalContacts!: number;
  form!: FormGroup;
  submittedData: any;
  heading = 'All Contact List';
  activeOrganization: string = '';
  showViewDetails: boolean = false;
  showEditForm: boolean = false;
  selectedRowsData: any[] = [];
  formHeading!: string;
  checkedCount: number = 0;
  checkBoxData: any;
  selectAll = false;
  uniqueOrgs!: string[];
  activeOrg: string | null = null;
  filterdata: any;
  viewData: any;
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
    {
      headerName: 'Name',
      field: 'name',

      cellRenderer: CustomCellComponent,
    },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone Number', field: 'number' },
  ];
  rowData: any[] = [];
  gridOptions!: GridOptions;

  gridApi!: GridApi;
  filter = new FormControl('');
  constructor(
    public dataService: DataService,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),

      orgName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.maxLength(10),
        ],
      ],
      another: this.fb.array([]),
      role: ['', Validators.required],
      additionalRoles: ['', Validators.required],
      remark: [''],
    });

    this.dataService.allData.subscribe((data: any) => {
      this.contactData = data;
      this.rowData = this.contactData.flatMap((org: any) =>
        org.contact.map((contact: any) => ({
          orgID: org.id,
          ...contact,
          orgName: org.orgName,
        }))
      );
    });

    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'Contact',
      },
    };

    this.filterdata = this.rowData;
    this.getAllData();
    this.formHeading = 'All Contact List';
  }

  onGridReady(params: any) {
    this.gridApi = params;
  }

  onSearchData() {
    this.gridApi?.setQuickFilter(this.searchValue);
  }

  totalCount = 0;

  getAllData() {
    this.totalCount = this.rowData.length;
    this.activeOrganization = 'All Contacts';
    this.totalContacts = this.totalCount;
    this.rowData = this.filterdata;
  }

  openTab(data: any, id: any) {
    this.router.navigate(['/org/organization'], { state: { data, id } });
  }

  filterContact(orgName: string) {
    this.rowData = this.filterdata;
    this.activeOrg = orgName;

    this.filteredRowData = this.rowData.filter(
      (item: any) => item.orgName === orgName
    );
    this.rowData = this.filteredRowData;
    console.log(this.filteredRowData);
  }

  isActive(orgName: string): boolean {
    return this.activeOrg === orgName;
  }
  createFormGroup(): FormGroup {
    return this.fb.group({
      type: [''],
    });
  }

  get mediumFormArray(): FormArray {
    return this.form.get('another') as FormArray;
  }

  addMedium(): void {
    this.mediumFormArray.push(this.createFormGroup());
  }
  getTypeControl(index: number): FormControl {
    const control = this.mediumFormArray.at(index).get('type');
    return control as FormControl;
  }
  removePhone(index: number): void {
    this.mediumFormArray.removeAt(index);
  }

  addContact() {
    this.formHeading = 'ADD CONTACT';
    this.form.enable();
    this.addData = true;
    this.showViewDetails = false;
    this.showEditForm = true;

    this.form.reset();
  }

  openForm(data: any, boxData: any) {
    this.addData = true;
    if (boxData == 'boxData') {
      this.showViewDetails = false;
      this.showEditForm = true;
      this.formHeading = 'EDIT DETAILS';
    } else {
      this.showViewDetails = true;
      this.showEditForm = false;
      this.formHeading = 'VIEW DETAILS';
    }
    const idData = this.rowData?.find((c: any) => c.id === data.id);
    if (idData) {
      this.form.patchValue({
        name: {
          firstName: idData.name.split(' ')[0],
          lastName: idData.name.split(' ')[1],
        },
        orgName: idData.orgName,
        email: idData.email,
        phone: idData.number,
        role: idData.role,
      });

      const organizationControl = this.form.get('orgName');
      if (organizationControl) {
        organizationControl.disable();
      }
    }
  }
  onSubmit(form: FormGroup): void {
    this.submittedData = this.form.value;
    this.submittedData.name =
      form.value.name.firstName + ' ' + form.value.name.lastName;
    const abcOrganization = this.contactData.find(
      (org: any) => org.orgName === this.submittedData.orgName
    );

    if (abcOrganization) {
      abcOrganization.contact.push(this.submittedData);
    }

    this.rowData = this.contactData.flatMap((org: any) =>
      org.contact.map((contact: any) => ({ ...contact, orgName: org.orgName }))
    );

    this.showEditForm = false;
    this.totalCount = this.rowData.length;
  }
  viewDetails(id: any) {
    console.log(id);
    const idData = this.rowData?.find((c: any) => c.id === id);
    this.addData = true;
    this.showViewDetails = true;
    this.showEditForm = false;
    this.viewData = idData;
  }
  editContact() {
    this.formHeading = 'EDIT DETAILS';
    this.addData = true;
    this.showViewDetails = false;
    this.showEditForm = true;
  }

  editContact1(data: any) {
    this.formHeading = 'EDIT DETAILS';
    this.addData = true;
    this.showViewDetails = false;
    this.showEditForm = true;
    this.viewData = data;
    this.openForm(data, 'boxData');
  }

  updateData(form: FormGroup) {
    this.viewData.name =
      form.value.name.firstName + ' ' + form.value.name.lastName;
    this.viewData.email = form.get('email')?.value;
    this.viewData.number = form.get('phone')?.value;
    this.viewData.role = form.get('role')?.value;
    const index = this.rowData.findIndex((row) => row.id === this.viewData.id);
    if (index !== -1) {
      this.rowData[index] = { ...this.rowData[index], ...this.viewData };
    }

    this.rowData = this.contactData.flatMap((org: any) =>
      org.contact.map((contact: any, id: any) => {
        if (id == index) {
          return { ...this.rowData[index], orgName: org.orgName };
        } else {
          return { ...contact, orgName: org.orgName };
        }
      })
    );

    this.showEditForm = false;
  }

  handleEditClick() {
    if (this.checkedCount !== 1) {
    } else {
      this.editContact1(this.checkBoxData[0]);
    }
  }

  checkBox(event: any) {
    this.checkBoxData = event;
    this.selectedRowsData = event;
    if (event.length == 1) {
      this.checkedCount = event.length;
    } else {
      this.checkedCount = event.length;
    }
  }

  deleteContact() {
    this.showViewDetails = false;

    // Filter out rows from rowData based on viewData (which contains the selected checkboxes)
    if (this.selectedRowsData.length > 0) {
      this.rowData = this.rowData.filter(
        (row) => !this.selectedRowsData.includes(row)
      );
      // Reset the selected rows' data
      this.selectedRowsData = [];
      this.checkedCount = 0;
      this.totalContacts = this.rowData.length;
    } else {
    }
    this.totalCount = this.rowData.length;
  }

  onClear() {
    this.form.reset();
    this.form.patchValue({
      orgName: this.rowData,
    });
  }
  cancel() {
    this.form.reset();

    this.showEditForm = false;
  }
  close() {
    this.showViewDetails = false;
  }
}
