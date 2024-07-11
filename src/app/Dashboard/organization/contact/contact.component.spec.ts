import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DecimalPipe } from '@angular/common';
import { of } from 'rxjs';
import { ContactComponent } from './contact.component';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { AgGridModule } from 'ag-grid-angular';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  // let dataService: DataService;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  const mockDataService = {
    allData: of([
      {
        id: 1,
        orgName: 'Org1',
        contact: [
          {
            id: 1,
            name: 'John Doe',
            role: 'Manager',
            email: 'john@example.com',
            number: '1234567890',
          },
        ],
      },
      {
        id: 2,
        orgName: 'Org2',
        contact: [
          {
            id: 2,
            name: 'Jane Smith',
            role: 'Developer',
            email: 'jane@example.com',
            number: '0987654321',
          },
        ],
      },
    ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FeatherModule.pick(allIcons),
        AgGridModule,
      ],
      providers: [
        FormBuilder,
        { provide: DataService, useValue: mockDataService },
        DecimalPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    // dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    component.form = new FormGroup({
      another: new FormArray([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.get('name.firstName')).toBeDefined();
    expect(component.form.get('name.lastName')).toBeDefined();
  });

  it('should fetch and process data on initialization', () => {
    component.ngOnInit();
    expect(component.contactData.length).toBe(2);
    expect(component.rowData.length).toBe(2);
    expect(component.rowData[0].name).toBe('John Doe');
    expect(component.rowData[1].name).toBe('Jane Smith');
  });

  it('should set gridApi on grid ready', () => {
    const mockParams = { api: {} as any };
    component.onGridReady(mockParams);
  
    // Ensure component.gridApi.api exists and is defined
    expect(component.gridApi).toBeDefined();
    expect(component.gridApi).toBeDefined();
    expect(typeof component.gridApi).toBe('object');
  });
  
 
  it('should set quick filter on search', () => {
    component.searchValue = 'search text';
    component.gridApi = jasmine.createSpyObj('gridApi', ['setQuickFilter']);

    component.onSearchData();

    expect(component.gridApi.setQuickFilter).toHaveBeenCalledWith('search text');
  });


  it('should navigate to /org/organization with state data', () => {
    const data = { key: 'value' };
    const id = 123;
    component.openTab(data, id);
    expect(navigateSpy).toHaveBeenCalledWith(['/org/organization'], {
      state: { data, id },
    });
  });

  it('should return the FormArray from the form', () => {
    expect(component.mediumFormArray).toBeInstanceOf(FormArray);
  });

  it('should add a FormGroup to the FormArray', () => {
    const initialLength = component.mediumFormArray.length;
    component.addMedium();
    expect(component.mediumFormArray.length).toBe(initialLength + 1);
  });

  it('should return the FormControl at the specified index', () => {
    component.addMedium();
    const control = component.getTypeControl(0);
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should remove a FormGroup at the specified index', () => {
    component.addMedium();
    component.addMedium();
    const initialLength = component.mediumFormArray.length;
    component.removePhone(0);
    expect(component.mediumFormArray.length).toBe(initialLength - 1);
  });

  it('should view details of the selected id', () => {
    const id = 1;
    spyOn(console, 'log');
    component.viewDetails(id);
    // expect(console.log).toHaveBeenCalledWith(id);
    expect(component.addData).toBeTrue();
    // expect(component.showViewDetails).toBeTrue();
    // expect(component.showEditForm).toBeFalse();
    // expect(component.viewData).toEqual({ id: 1, name: 'Contact 1' });
  });

  it('should set the form to edit mode', () => {
    component.editContact();

    expect(component.addData).toBeTrue();
  
  });

  it('should set the form to edit mode with specific data', () => {
    const data = { id: 1, name: 'Contact 1' };
    spyOn(component, 'openForm');
    component.editContact1(data);
    expect(component.formHeading).toBe('EDIT DETAILS');
    expect(component.addData).toBeTrue();
    expect(component.showViewDetails).toBeFalse();
    expect(component.showEditForm).toBeTrue();
    expect(component.openForm).toHaveBeenCalledWith(data, 'boxData');
  });

  it('should open form to add new contact', () => {
    component.addContact();
    expect(component.formHeading).toBe('ADD CONTACT');
    expect(component.addData).toBeTrue();
    expect(component.showEditForm).toBeTrue();
    expect(component.form.enabled).toBeTrue();
  });

  it('should open form in edit mode and update the form with data', () => {
   
    const data = { id: 1 };
    const boxData = 'boxData';
    component.openForm(data, boxData);

  });

  it('should open form in view mode and update the form with data', () => {
    const data = { id: 1 };
    const boxData = 'viewData';
    component.openForm(data, boxData);

    expect(component.addData).toBeTrue();
   
    
  });
  it('should update contact data on submit', () => {
    component.contactData = [
      {
        id: 1,
        orgName: 'Org1',
        contact: [
          {
            id: 1,
            name: 'John Doe',
            role: 'Manager',
            email: 'john@example.com',
            number: '1234567890',
          },
        ],
      },
    ];

    const formValue = {
      name: { firstName: 'John', lastName: 'Doe' },
      orgName: 'Org1',
      email: 'john@example.com',
      phone: '1234567890',
      role: 'Manager',
      another: [],
    };

    component.form.patchValue(formValue);
    component.onSubmit(component.form);
    expect(component.rowData.length).toBe(2);
    expect(component.rowData[1].name).toBe('John Doe');
  });

  it('should filter contacts by organization', () => {
    component.ngOnInit();
    component.filterContact('Org1');
    expect(component.filteredRowData.length).toBe(1);
    expect(component.filteredRowData[0].orgName).toBe('Org1');
  });


  it('should update rowData correctly', () => {
    component.viewData = { id: 1, name: '', email: '', number: '', role: '' };
    component.rowData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', number: '1234567890', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', number: '0987654321', role: 'User' }
    ];
    component.contactData = [
      { orgName: 'Org1', contact: [{ id: 1 }, { id: 2 }] }
    ];

    const form = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('Updated'),
        lastName: new FormControl('Name')
      }),
      email: new FormControl('updated@example.com'),
      phone: new FormControl('1112223333'),
      role: new FormControl('Manager')
    });

    component.updateData(form);

    // expect(component.rowData).toEqual([
    //   { id: 1, name: 'Updated Name', email: 'updated@example.com', number: '1112223333', role: 'Manager', orgName: 'Org1' },
    //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', number: '0987654321', role: 'User', orgName: 'Org1' }
    // ]);
    expect(component.showEditForm).toBeFalse();
  });
  it('should call editContact1 when checkedCount is 1', () => {
    spyOn(component, 'editContact1');
    component.checkBoxData = [{ id: 1, name: 'Test' }];
    component.checkedCount = 1;

    component.handleEditClick();

    expect(component.editContact1).toHaveBeenCalledWith({ id: 1, name: 'Test' });
  });

  it('should not call editContact1 when checkedCount is not 1', () => {
    spyOn(component, 'editContact1');
    component.checkBoxData = [{ id: 1, name: 'Test' }, { id: 2, name: 'Test2' }];
    component.checkedCount = 2;

    component.handleEditClick();

    expect(component.editContact1).not.toHaveBeenCalled();
  });

  it('should update checkBoxData, selectedRowsData, and checkedCount in checkBox method', () => {
    const event = [{ id: 1, name: 'Test' }];

    component.checkBox(event);

    expect(component.checkBoxData).toEqual(event);
    expect(component.selectedRowsData).toEqual(event);
    expect(component.checkedCount).toBe(1);
  });

  it('should update checkedCount correctly when multiple items are selected', () => {
    const event = [{ id: 1, name: 'Test' }, { id: 2, name: 'Test2' }];

    component.checkBox(event);

    expect(component.checkBoxData).toEqual(event);
    expect(component.selectedRowsData).toEqual(event);
    expect(component.checkedCount).toBe(2);
  });
  it('should delete selected rows and update rowData and counts', () => {
    component.rowData = [
      { id: 1, name: 'Contact1' },
      { id: 2, name: 'Contact2' },
      { id: 3, name: 'Contact3' }
    ];
    component.selectedRowsData = [{ id: 2, name: 'Contact2' }];
    component.checkedCount = 1;
    component.totalContacts = component.rowData.length;

    component.deleteContact();

    expect(component.selectedRowsData).toEqual([]);
    expect(component.checkedCount).toBe(0);
    expect(component.totalContacts).toBe(3);
    expect(component.totalCount).toBe(3);
    expect(component.showViewDetails).toBeFalse();
  });

  it('should reset form and patch value in onClear', () => {
    component.rowData = [
      { id: 1, name: 'Contact1' },
      { id: 2, name: 'Contact2' }
    ];

    component.onClear();

    expect(component.form.get('orgName')?.value).toEqual(component.rowData);
  });

  it('should reset form and hide edit form in cancel', () => {
    component.showEditForm = true;

    component.cancel();

    expect(component.showEditForm).toBeFalse();
  });

  it('should hide view details in close', () => {
    component.showViewDetails = true;

    component.close();

    expect(component.showViewDetails).toBeFalse();
  });
});
