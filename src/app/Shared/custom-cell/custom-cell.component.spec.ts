import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellComponent } from './custom-cell.component';
import { ICellRendererParams } from 'ag-grid-community';

describe('CustomCellComponent', () => {
  let component: CustomCellComponent;
  let fixture: ComponentFixture<CustomCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with agInit', () => {
    const params: ICellRendererParams = {
      data: { name: 'John Doe', orgName: 'OpenAI', orgID: 1 },
      colDef: { field: 'testField' },
      context: {},
      // Mock other properties if needed
    } as ICellRendererParams;

    component.agInit(params);

    expect(component.contactName).toBe('John Doe');
    expect(component.orgName).toBe('OpenAI');
    expect(component.params).toEqual(params);
    expect(component.fieldName).toBe('testField');
  });

  it('should refresh with new params', () => {
    const initialParams: ICellRendererParams = {
      data: { name: 'John Doe', orgName: 'OpenAI', orgID: 1 },
      colDef: { field: 'initialField' },
      context: {},
      // Mock other properties if needed
    } as ICellRendererParams;

    const newParams: ICellRendererParams = {
      data: { name: 'Jane Doe', orgName: 'OpenAI', orgID: 2 },
      colDef: { field: 'newField' },
      context: {},
      // Mock other properties if needed
    } as ICellRendererParams;

    component.agInit(initialParams);
    const result = component.refresh(newParams);

    expect(component.params).toEqual(newParams);
    expect(result).toBeTrue();
  });

  it('should handle orgNameClick correctly for Org', () => {
    const parentComponentMock = {
      add: jasmine.createSpy('add'),
    };

    const params: ICellRendererParams = {
      data: { name: 'John Doe', orgName: 'OpenAI', orgID: 1 },
      context: { parent: 'Org', parentComponent: parentComponentMock },
    } as ICellRendererParams;

    component.agInit(params);
    component.orgNameClick();

    expect(parentComponentMock.add).toHaveBeenCalledWith(params.data);
  });

  it('should handle orgNameClick correctly for Contact', () => {
    const parentComponentMock = {
      contactData: [{ id: 1, orgID: 1 }],
      openTab: jasmine.createSpy('openTab'),
    };

    const params: ICellRendererParams = {
      data: { name: 'John Doe', orgName: 'OpenAI', orgID: 1 },
      context: { parent: 'Contact', parentComponent: parentComponentMock },
    } as ICellRendererParams;

    component.agInit(params);
    component.orgNameClick();

    expect(parentComponentMock.openTab).toHaveBeenCalledWith(
      parentComponentMock.contactData,
      params.data.orgID
    );
  });

  it('should handle contactClick correctly', () => {
    const parentComponentMock = {
      openForm: jasmine.createSpy('openForm'),
      viewDetails: jasmine.createSpy('viewDetails'),
    };

    const params: ICellRendererParams = {
      data: { name: 'John Doe', orgName: 'OpenAI', orgID: 1, id: 1 },
      context: { parentComponent: parentComponentMock },
    } as ICellRendererParams;

    component.agInit(params);
    component.contactClick();

    expect(parentComponentMock.openForm).toHaveBeenCalledWith(
      params.data,
      'checkBox'
    );
    expect(parentComponentMock.viewDetails).toHaveBeenCalledWith(
      params.data.id
    );
  });
  it('should do nothing on ngOnInit', () => {
    component.ngOnInit();
    expect(true).toBeTrue();
  });
});
