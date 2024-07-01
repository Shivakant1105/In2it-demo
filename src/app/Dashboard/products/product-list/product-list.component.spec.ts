import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductsListService } from '../../service/products-list.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductsListService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ProductListComponent],
      providers: [ProductsListService],
    }).compileComponents();

    productService = TestBed.inject(ProductsListService); // Inject the ProductsListService
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
  

  // it('should set gridApi on grid ready', () => {
  //   const mockParams = { api: gridApi };
  //   component.onGridReady(mockParams);

  //   expect(component.gridApi).toBe(mockParams.api);
  // });
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

  // it('should navigate to product table with selected data', () => {
  //   spyOn(router, 'navigate');

  //   const mockSelectedNodes: RowNode[] = [
  //     { data: { table_name: { value: 'Table1' }, is_table_exist: false } } as RowNode,
  //   ];
  //   gridApi.getSelectedNodes.and.returnValue(mockSelectedNodes);

  //   component.rowData = [
  //     { table_name: { value: 'Table1' }, is_table_exist: true },
  //     { table_name: { value: 'Table2' }, is_table_exist: false },
  //   ];

  //   component.addToList();


  //   expect(router.navigate).toHaveBeenCalledWith(['/products/product-table'], {
  //     state: {
  //       tables: [
  //         { table_name: { value: 'Table1' }, is_table_exist: true },
  //         { table_name: { value: 'Table2' }, is_table_exist: true, table_id: jasmine.any(Object), created_on: jasmine.any(Object), created_by: jasmine.any(Object) },
  //       ],
  //     },
  //   });
  // });

  // it('should navigate to home on cancel', () => {
  //   spyOn(router, 'navigate');

  //   component.onCancel();

  //   expect(router.navigate).toHaveBeenCalledWith(['/']);
  // });
});
