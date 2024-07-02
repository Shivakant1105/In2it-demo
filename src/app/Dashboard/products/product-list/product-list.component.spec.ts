import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductsListService } from '../../service/products-list.service';
import { Router } from '@angular/router';
import { RowNode } from 'ag-grid-community';
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductsListService;
  let router: Router;
  let mockGridApi: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ProductListComponent],
      providers: [ProductsListService],
    }).compileComponents();

    productService = TestBed.inject(ProductsListService); 
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockGridApi = jasmine.createSpyObj('gridApi', ['getSelectedNodes']);
    component.gridApi = mockGridApi;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product list on init', () => {
    const productsListMock = { data: [{ table_name: { value: 'Table1' }, is_table_exist: true }] };
    spyOn(productService, 'getProductsList').and.returnValue(of(productsListMock));

    component.ngOnInit();

    expect(component.rowData).toEqual(productsListMock.data);
  });




  it('should format boolean values correctly', () => {
    const paramsTrue = { value: true };
    const paramsFalse = { value: false };
  
    expect(component.booleanValueFormatter(paramsTrue)).toBe('Yes');
    expect(component.booleanValueFormatter(paramsFalse)).toBe('No');
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

  it('should toggle column list visibility', () => {
    expect(component.showColumnList).toBeFalse();

    component.toggleColumnListVisibility();

    expect(component.showColumnList).toBeTrue();
  });
 
  
it('should navigate to product table with selected data', () => {
  spyOn(router, 'navigate');

  const mockSelectedNodes: RowNode[] = [
    { data: { table_name: { value: 'Table1' }, is_table_exist: true } } as RowNode,
    { data: { table_name: { value: 'Table2' }, is_table_exist: true } } as RowNode,
  ];

  // Mock gridApi.getSelectedNodes to return mockSelectedNodes
  mockGridApi.getSelectedNodes.and.returnValue(mockSelectedNodes);

  // Set up component.rowData with mock data
  component.rowData = [
    { table_name: { value: 'Table1' }, is_table_exist: true },
    { table_name: { value: 'Table2' }, is_table_exist: true },
  ];

  // Call addToList method which triggers navigation
  component.addToList();

  // Verify that allTables contains the expected tables with additional properties
  expect(component.allTables.length).toBe(2); // Ensure allTables has two tables

  // Verify router.navigate was called with expected route and state
  expect(router.navigate).toHaveBeenCalledWith(['/products/product-table'], {
    state: {
      tables: [
        { table_name: { value: 'Table1' }, is_table_exist: true },
        { table_name: { value: 'Table2' }, is_table_exist: true, table_id: jasmine.any(Object), created_on: jasmine.any(Object), created_by: jasmine.any(Object) }
      ]
    },
  });
});

  
  


  it('should navigate to home on cancel', () => {
    spyOn(router, 'navigate');

    component.onCancel();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
