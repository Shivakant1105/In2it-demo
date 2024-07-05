import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DecimalPipe } from '@angular/common';
import { of } from 'rxjs';
import { ContactComponent } from './contact.component';
import { DataService } from '../../service/data.service';
import { GridApi } from 'ag-grid-community';
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
  let mockGridApi: jasmine.SpyObj<GridApi<any>>;
  const mockDataService = {
    allData: of([
      {
        id: 1,
        orgName: 'Org1',
        contact: [
          { id: 1, name: 'John Doe', role: 'Manager', email: 'john@example.com', number: '1234567890' }
        ]
      },
      {
        id: 2,
        orgName: 'Org2',
        contact: [
          { id: 2, name: 'Jane Smith', role: 'Developer', email: 'jane@example.com', number: '0987654321' }
        ]
      }
    ])
  };

  beforeEach(async () => {
    mockGridApi = jasmine.createSpyObj('GridApi', ['setQuickFilter']);
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FeatherModule.pick(allIcons),AgGridModule
      ],
      providers: [ FormBuilder,
        { provide: DataService, useValue: mockDataService },
        DecimalPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    // dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate'); 
    component.form = new FormGroup({
      another: new FormArray([])
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


  it('should set gridApi on onGridReady', () => {
    const params = { api: mockGridApi }; // Mock params with the correct GridApi type
    component.onGridReady(params);
    expect(component['gridApi']).toBe(params.api);
  });

  it('should call setQuickFilter on gridApi when onSearchData is called', () => {
    component['gridApi'] = mockGridApi;
    component.searchValue = 'testValue';
    component.onSearchData();
    expect(mockGridApi.setQuickFilter).toHaveBeenCalledWith('testValue');
  });

  it('should navigate to /org/organization with state data', () => {
    const data = { key: 'value' };
    const id = 123;
    component.openTab(data, id);
    expect(navigateSpy).toHaveBeenCalledWith(['/org/organization'], { state: { data, id } });
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
    expect(console.log).toHaveBeenCalledWith(id);
    expect(component.addData).toBeTrue();
    expect(component.showViewDetails).toBeTrue();
    expect(component.showEditForm).toBeFalse();
    expect(component.viewData).toEqual({ id: 1, name: 'Contact 1' });
  });

  it('should set the form to edit mode', () => {
    component.editContact();
    expect(component.formHeading).toBe('EDIT DETAILS');
    expect(component.addData).toBeTrue();
    expect(component.showViewDetails).toBeFalse();
    expect(component.showEditForm).toBeTrue();
  });

  it('should set the form to edit mode with specific data', () => {
    const data = { id: 1, name: 'Contact 1' };
    spyOn(component, 'openForm');
    component.editContact1(data);
    expect(component.formHeading).toBe('EDIT DETAILS');
    expect(component.addData).toBeTrue();
    expect(component.showViewDetails).toBeFalse();
    expect(component.showEditForm).toBeTrue();
    expect(component.viewData).toEqual(data);
    expect(component.openForm).toHaveBeenCalledWith(data, 'boxData');
  });






  it('should open form to add new contact', () => {
    component.addContact();
    expect(component.formHeading).toBe('ADD CONTACT');
    expect(component.addData).toBeTrue();
    expect(component.showEditForm).toBeTrue();
    expect(component.form.enabled).toBeTrue();
  });

  it('should open form to edit existing contact', () => {
    const contact = { id: 1, orgName: 'Org1', name: 'John Doe', email: 'john@example.com', number: '1234567890', role: 'Manager' };
    component.openForm(contact, 'boxData');
    expect(component.formHeading).toBe('EDIT DETAILS');
    expect(component.addData).toBeTrue();
    expect(component.showEditForm).toBeTrue();
    expect(component.form.get('name.firstName')?.value).toBe('John');
    expect(component.form.get('name.lastName')?.value).toBe('Doe');
  });
  

  it('should update contact data on submit', () => {
    component.contactData = [
      { id: 1, orgName: 'Org1', contact: [{ id: 1, name: 'John Doe', role: 'Manager', email: 'john@example.com', number: '1234567890' }] }
    ];
    component.rowData = component.contactData.flatMap((org: any) =>
      org.contact.map((contact: any) => ({ orgID: org.id, ...contact, orgName: org.orgName }))
    );

    const formValue = {
      name: { firstName: 'John', lastName: 'Doe' },
      orgName: 'Org1',
      email: 'john@example.com',
      phone: '1234567890',
      role: 'Manager',
      another: []
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

 
});
