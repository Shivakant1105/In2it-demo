import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridComponent } from './ag-grid.component';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';

describe('AgGridComponent', () => {
  let component: AgGridComponent;
  let fixture: ComponentFixture<AgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize colDeflist and set hide to false in ngOnInit', () => {
    component.columnDefs = [
      { field: 'name', hide: true },
      { field: 'age', hide: true },
    ] as ColDef[];

    component.ngOnInit();

    expect(component.colDeflist).toEqual([
      { field: 'name', hide: false },
      { field: 'age', hide: false },
    ]);
  });

  it('should emit gridApi in onGridReady', () => {
    const params = { api: {} as GridApi };
    spyOn(component.GridReady, 'emit');

    component.onGridReady(params);

    expect(component.gridApi).toBe(params.api);
    expect(component.GridReady.emit).toHaveBeenCalledWith(params.api);
  });

  it('should emit selected rows in onCheckBoxChange', () => {
    const mockGridApi = {
      getSelectedRows: jasmine
        .createSpy('getSelectedRows')
        .and.returnValue([{ id: 1, name: 'John' }]),
    } as unknown as GridApi;

    component.gridOptions = {
      api: mockGridApi,
    } as GridOptions;

    spyOn(component.checkBoxChange, 'emit');

    component.onCheckBoxChange();

    expect(mockGridApi.getSelectedRows).toHaveBeenCalled();
    expect(component.checkBoxChange.emit).toHaveBeenCalledWith([
      { id: 1, name: 'John' },
    ]);
  });

  it('should toggle column visibility correctly', () => {
    const col = { field: 'name', hide: false };
    component.toggleColumnVisibility(col);
    col.hide = true;
    expect(col.hide).toBeTrue();
  });

  it('should toggle column visibility correctly', () => {
    const col = { field: 'name', hide: true };
    component.toggleColumnVisibility(col);
    col.hide = false;
    expect(col.hide).toBeFalse();
  });
});
