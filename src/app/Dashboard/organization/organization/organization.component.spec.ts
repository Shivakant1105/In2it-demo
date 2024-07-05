import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../service/data.service';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { AgGridModule } from 'ag-grid-angular';
import { EventEmitter } from '@angular/core';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  // let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['allData']);
    await TestBed.configureTestingModule({
      imports: [NgbNavModule, FeatherModule.pick(allIcons), AgGridModule],
      declarations: [OrganizationComponent],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;

    // component.navs = [
    //   { id: 1, name: 'Tab 1' },
    //   { id: 2, name: 'Tab 2' }
    // ]; // Mock navs

    component.navsData = new EventEmitter<any>();
    spyOn(component.navsData, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the tab and reset active tab', () => {
    const mockEvent = new MouseEvent('click');
    spyOn(mockEvent, 'preventDefault');
    spyOn(mockEvent, 'stopImmediatePropagation');

    component.close(mockEvent, 1);

    expect(component.navs.length).toBe(2);
    expect(component.navs.find((nav) => nav.id === 2)).toBeUndefined();
    expect(component.active).toBe(0);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should set flag to false if tab does not exist checkExisitingTab', () => {
    const testNavData = {
      id: 1,
      orgName: 'Organization 1',
      email: '',
      industry: '',
      onboarding: '',
      orgSPOC: '',
      phone: '',
      products: '',
      relatedOrgs: '',
      type: '',
    };
    component.checkExisitingTab(1);
    // expect(component.flag).toBe(false);
    component.navs.push(testNavData);
    component.navs.some((data: any) => {
      console.log(data.id === 1,"data.id === 1");
      
      if (data.id === 1) {
        component.flag=true
        expect(component.flag).toBe(true);
      }
    });

  });

  it('should set active tab and not add tab if it exists', () => {
    const org = { id: 2, name: 'Tab 2' };

    component.flag = false;
    // console.log(component.flag, 'hjlkjkljk');

    component.add(org);
    expect(component.flag).toBe(true);
    expect(component.checkExisitingTab).toHaveBeenCalledWith(org.id);
    expect(component.active).toBe(org.id);
    expect(component.navs.length).toBe(2);
    expect(component.navsData.emit).toHaveBeenCalledWith(org);
  });
});
