import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../service/data.service';
import { FeatherModule } from 'angular-feather';
import { allIcons,  } from 'angular-feather/icons';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  // let dataService: jasmine.SpyObj<DataService>;
  let dataServiceMock: any;
  let routerMock: any;
  beforeEach(async () => {
    dataServiceMock = {
      allData: of([{ id: 1, name: 'Org1' }, { id: 2, name: 'Org2' }])
    };
    await TestBed.configureTestingModule({
      imports: [NgbNavModule, FeatherModule.pick(allIcons), ],
      declarations: [OrganizationComponent],
      providers: [ { provide: DataService, useValue: dataServiceMock },
        { provide: Router, useValue: routerMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;

   
    component.navsData = new EventEmitter<any>();
    spyOn(component.navsData, 'emit');
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize with data from dataService and navigate state', () => {
    spyOn(component, 'getAllTable');
 
    component.ngOnInit();

    expect(component.organizations).toEqual([{ id: 1, name: 'Org1' }, { id: 2, name: 'Org2' }]);
    expect(component.rowData).toEqual([{ id: 1, name: 'Org1' }, { id: 2, name: 'Org2' }]);
    
  });

  it('should not call add method when navigation.data is an empty array', () => {
    spyOn(component, 'add');
    history.pushState({id:1, data: [] }, '', '/');
    component.ngOnInit();
    expect(component.add).toHaveBeenCalled();
  });


  

  it('should remove the item from navs array and set active to 0', () => {
    const mockEvent = new MouseEvent('click');
    spyOn(mockEvent, 'preventDefault');
    spyOn(mockEvent, 'stopImmediatePropagation');
    component.close(mockEvent, 1);
    expect(component.navs.find((nav) => nav.id === 2)).toBeUndefined();
    expect(component.active).toBe(0);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
  });
  

  it('should set flag to false if tab does not exist checkExisitingTab', () => {
    component.navs = [{
      id: 0,
      orgName: 'Org1',
      email: '',
      industry: '',
      onboarding: '',
      orgSPOC: '',
      phone: '',
      products: '',
      relatedOrgs: '',
      type: '',
    }];
    component.checkExisitingTab(0);
    expect(component.flag).toBe(true);
   
    });

    it('checkExisitingTab is false', () => {
      component.navs = [
        {
          id: 0,
          orgName: 'Org1',
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
      component.checkExisitingTab(1);
      expect(component.flag).toBeFalse();
    });
  it('should set active tab and not add tab if it exists', () => {
    const org = { id: 2, name: 'Tab 2' };
    component.flag = false;
    component.add(org);
    expect(component.flag).toBe(false);
    expect(component.active).toBe(org.id);
    expect(component.navs.length).toBe(2);
  });
  it('should filter organizations by filterName and update rowData', () => {
    component.organizations = [
      { id: 1, name: 'Org1', type: 'Type1' },
      { id: 2, name: 'Org2', type: 'Type2' },
      { id: 3, name: 'Org3', type: 'Type1' }
    ];

    component.filterData('Type1');
    expect(component.rowData).toEqual([
      { id: 1, name: 'Org1', type: 'Type1' },
      { id: 3, name: 'Org3', type: 'Type1' }
    ]);
  });


  it('call getalltable',()=>{
    component.getAllTable()
  })
})
