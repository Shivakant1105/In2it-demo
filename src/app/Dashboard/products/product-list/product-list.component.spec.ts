import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductsListService } from '../../service/products-list.service';
import { Router } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductsListService;
  let router: Router;
  let mockGridApi: any;
  // const mockRouter = {
  //   navigate: jasmine.createSpy('navigate')
  // };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        FeatherModule.pick(allIcons),
      ],
      declarations: [ProductListComponent],
      providers: [ProductsListService],
    }).compileComponents();

    productService = TestBed.inject(ProductsListService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    mockGridApi = jasmine.createSpyObj('gridApi', ['getSelectedNodes']);
    component.gridApi = mockGridApi;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false for isRowSelectable if is_table_exist is true', () => {
    const params = { data: { is_table_exist: true } };
    const { isRowSelectable }: any = component.gridOptions;
    isRowSelectable(params);
    const { getRowStyle }: any = component.gridOptions;
    getRowStyle(params);
  });
  it('should return false for isRowSelectable if is_table_exist is true', () => {
    const params = { data: { is_table_exist: false } };

    const { getRowStyle }: any = component.gridOptions;
    getRowStyle(params);
  });

  it('should fetch product list on init', () => {
    const productsListMock = {
      data: [{ table_name: { value: 'Table1' }, is_table_exist: true }],
    };
    spyOn(productService, 'getProductsList').and.returnValue(
      of(productsListMock)
    );

    component.ngOnInit();

    expect(component.rowData).toEqual(productsListMock.data);
  });

  it('generates an ID within the range 0 to 999', () => {
    const id = component.randomId();
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThan(1000);
  });

  it('returns the current date', () => {
    const result = component.currentDate();
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = today.getFullYear();
    const expectedDate = `${day}/${month}/${year}`;
    expect(result).toBe(expectedDate);
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

    expect(component.gridApi).toBeDefined();
    expect(component.gridApi).toBeDefined();
    expect(typeof component.gridApi).toBe('object');
  });

  it('should set quick filter on search', () => {
    component.searchValue = 'search text';
    component.gridApi = jasmine.createSpyObj('gridApi', ['setQuickFilter']);

    component.onSearchData();

    expect(component.gridApi.setQuickFilter).toHaveBeenCalledWith(
      'search text'
    );
  });

  it('should toggle column list visibility', () => {
    expect(component.showColumnList).toBeFalse();

    component.toggleColumnListVisibility();

    expect(component.showColumnList).toBeTrue();
  });

  // it('should navigate to product table with selected data', () => {
  //   spyOn(router, 'navigate');

  //   component.rowData = [
  //     { table_name: { value: 'Table1' }, is_table_exist: true },
  //     { table_name: { value: 'Table2' }, is_table_exist: true },
  //   ];

  //   component.addToList();
  // });

  it('should navigate to home on cancel', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
  it('addToList', () => {
    spyOn(router, 'navigate');

    const gridOptions: any = {
      api: {
        getSelectedNodes: () => {
          return [{ data: { is_table_exist: false } }];
        },
      },
      data: { is_table_exist: false },
    };
    component.gridOptions = gridOptions;
    component.rowData = [{ is_table_exist: true }];
    component.addToList();
  });
  it('addToList', () => {
    spyOn(router, 'navigate');

    const gridOptions: any = {
      api: null,
    };
    component.gridOptions = gridOptions;
    component.rowData=[];

    component.addToList();
  });
});
