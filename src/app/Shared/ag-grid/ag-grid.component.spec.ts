import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridComponent } from './ag-grid.component';
import { GridOptions, } from 'ag-grid-community';

class MockColumnApi {
  setColumnVisible = jasmine.createSpy('setColumnVisible');
}

class MockGridOptions {
  columnApi = new MockColumnApi();
  api = {
    getSelectedRows: jasmine.createSpy('getSelectedRows').and.returnValue([{ id: 1, name: 'Test Row' }])
  };
}

describe('AgGridComponent', () => {
  let component: AgGridComponent;
  let fixture: ComponentFixture<AgGridComponent>;
  let mockGridOptions: MockGridOptions;

  beforeEach(async () => {
    mockGridOptions = new MockGridOptions();
    await TestBed.configureTestingModule({
      declarations: [AgGridComponent],
      providers: [{ provide: MockGridOptions, useValue: mockGridOptions }]
    }).compileComponents();
 ``
    fixture = TestBed.createComponent(AgGridComponent);
    component = fixture.componentInstance;
    component.gridOptions = mockGridOptions as unknown as GridOptions;
    component.columnDefs = [{ field: 'testField', hide: false }];
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize column definitions on ngOnInit', () => {
    component.ngOnInit();
    expect(component.colDeflist).toEqual([{ field: 'testField', hide: false }]);
  });

  it('should hide the column if it is currently visible', () => {
    const col = { field: 'testField', hide: false };
    component.toggleColumnVisibility(col);
    expect(mockGridOptions.columnApi.setColumnVisible).toHaveBeenCalledWith('testField', false);
    expect(col.hide).toBe(true);
  });

  it('should show the column if it is currently hidden', () => {
    const col = { field: 'testField', hide: true };
    component.toggleColumnVisibility(col);
    expect(mockGridOptions.columnApi.setColumnVisible).toHaveBeenCalledWith('testField', true);
    expect(col.hide).toBe(false);
  });

  it('should emit GridReady event on grid ready', () => {
    spyOn(component.GridReady, 'emit');
    component.onGridReady({ api: {} });
    expect(component.GridReady.emit).toHaveBeenCalledWith({});
  });

  it('should emit checkBoxChange event on checkbox change', () => {
    spyOn(component.checkBoxChange, 'emit');
    component.onCheckBoxChange();
    expect(component.checkBoxChange.emit).toHaveBeenCalledWith([{ id: 1, name: 'Test Row' }]);
  });
});
