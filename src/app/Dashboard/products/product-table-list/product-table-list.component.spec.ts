import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListService } from '../../service/products-list.service';
import { ProductTableListComponent } from './product-table-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
import { GridApi, GridOptions } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { InputRendererComponent } from 'src/app/Shared/input-renderer/input-renderer.component';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { of, throwError } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';

describe('ProductTableListComponent', () => {
  let component: ProductTableListComponent;
  let fixture: ComponentFixture<ProductTableListComponent>;
  let productService: jasmine.SpyObj<ProductsListService>;

  let gridApi: jasmine.SpyObj<GridApi>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsListService', [
      'getProductsList',
    ]);
    gridApi = jasmine.createSpyObj('GridApi', [
      'setQuickFilter',
      'applyTransaction',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        AgGridModule,
        
        FeatherModule.pick(allIcons),
      ],
      declarations: [
        ProductTableListComponent,
        InputRendererComponent,
        ActionButtonComponent,
      ],
      providers: [
        { provide: ProductsListService, useValue: productServiceSpy },
        { provide: GridApi, useValue: gridApi },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableListComponent);
    component = fixture.componentInstance;
    component.gridOptions = <GridOptions>{
      api: jasmine.createSpyObj('GridApi', ['applyTransaction']),
      context: { parentComponent: { rowData: [] } }
    };
    productService = TestBed.inject(ProductsListService) as jasmine.SpyObj<ProductsListService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set rowData from history state if available', () => {
    const mockTables = [{ id: 1, is_table_exist: true }];
    window.history.pushState({ tables: mockTables }, '');

    component.ngOnInit();

    expect(component.rowData).toEqual(mockTables);
  });

  it('should fetch products from service if history state is not available', () => {
    const mockResponse = { data: [{ id: 1, is_table_exist: true }] };
    productService.getProductsList.and.returnValue(of(mockResponse));

    window.history.pushState({}, '');

    component.ngOnInit();

    expect(productService.getProductsList).toHaveBeenCalled();
    expect(component.rowData).toEqual([{ id: 1, is_table_exist: true, edit_mode: false }]);
  });

  it('should log an error if fetching products fails', () => {
    const consoleSpy = spyOn(console, 'error');
    productService.getProductsList.and.returnValue(throwError('error'));

    window.history.pushState({}, '');

    component.ngOnInit();

    expect(productService.getProductsList).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching products', 'error');
  });

    
  it('should initialize gridApi and gridColumnApi on grid ready', () => {
    const mockParams = { api: gridApi }; // Create mock params object
    component.onGridReady(mockParams);
    expect(component.gridColumnApi).toBe(mockParams);
  });

  it('should set quick filter on search', () => {
    component.searchValue = 'search text';
    component.gridApi = jasmine.createSpyObj('gridApi', ['setQuickFilter']);

    component.onSearchData();

    expect(component.gridApi.setQuickFilter).toHaveBeenCalledWith('search text');
  });
  it('should toggle column list visibility', () => {
    expect(component.showColumnList).toBeFalse();
    component.toggleColumnListVisibility();
  });

  it('should generate random ID', () => {
    const randomId = component.randomId();
    expect(typeof randomId).toBe('number');
    expect(randomId).toBeGreaterThanOrEqual(0);
    expect(randomId).toBeLessThanOrEqual(999);
  });

  it('should generate current date in dd/mm/yyyy format', () => {
    const currentDate = component.currentDate();
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    expect(datePattern.test(currentDate)).toBeTrue();
  });

  it('should add a new row with the correct data', () => {
    component.addRow();

    const expectedRow = {
      addMode: true,
      table_id: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      table_type: jasmine.objectContaining({ is_edit: true, type: 'string' }),
      table_name: jasmine.objectContaining({ is_edit: true, type: 'string' }),
      description: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      attribute_count: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      rows_count: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      created_on: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      created_by: jasmine.objectContaining({ value: 'Shiva Kant', is_edit: false, type: 'string' }),
      updated_on: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      updated_by: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      is_standard: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      is_active: jasmine.objectContaining({ is_edit: false, type: 'string' }),
      property: jasmine.objectContaining({ is_edit: false, is_delete: false }),
      is_table_exist: undefined,
      related_table: [],
      total_record: 0,
      status: false,
      message: '',
      updateData: jasmine.anything(),
    };

    
    expect(component.gridOptions.context.parentComponent.rowData).toContain(jasmine.objectContaining(expectedRow));
  });

});