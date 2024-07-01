import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListService } from '../../service/products-list.service';
import { ProductTableListComponent } from './product-table-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
import { GridApi } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { InputRendererComponent } from 'src/app/Shared/input-renderer/input-renderer.component';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';

describe('ProductTableListComponent', () => {
  let component: ProductTableListComponent;
  let fixture: ComponentFixture<ProductTableListComponent>;
 
  let gridApi: jasmine.SpyObj<GridApi>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsListService', ['getProductsList']);
    gridApi = jasmine.createSpyObj('GridApi', ['setQuickFilter', 'applyTransaction']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ProductTableListComponent, InputRendererComponent, ActionButtonComponent],
      providers: [
        { provide: ProductsListService, useValue: productServiceSpy },
        { provide: GridApi, useValue: gridApi }
      ]
    }).compileComponents();

   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch product list on init when state data is not available', () => {
  //   const productsListMock = {
  //     data: [
  //       {
  //         table_id: { value: '1' },
  //         table_name: { value: 'Table1' },
  //         description: { value: 'Description1' },
  //         created_on: { value: '01/01/2022' },
  //         created_by: { value: 'User1' },
  //         updated_on: { value: '01/01/2023' },
  //         updated_by: { value: 'User2' },
  //         is_table_exist: true,
  //         edit_mode: false
  //       }
  //     ]
  //   };

  //   productService.getProductsList.and.returnValue(of(productsListMock));

  //   component.ngOnInit();

  //   expect(productService.getProductsList).toHaveBeenCalled();
  //   expect(component.rowData).toEqual(productsListMock.data);
  // });
  it('should initialize gridApi and gridColumnApi on grid ready', () => {
    const mockParams = {api: gridApi }; // Create mock params object
    component.onGridReady(mockParams);

    // Assert that gridApi and gridColumnApi are initialized correctly
    // expect(component.gridApi).toBe(mockParams.api);
    expect(component.gridColumnApi).toBe(mockParams);
  });
  // it('should set gridApi on grid ready', () => {
  //   const mockParams = { api: gridApi, columnApi: {} };
  //   component.onGridReady(mockParams);

  //   expect(component.gridApi).toBe(mockParams.api);
  //   expect(component.gridColumnApi).toBe(mockParams);
  // });

  // it('should set quick filter on search', () => {
  //   component.searchValue = 'search text';

  //   component.onSearchData();

  //   expect(gridApi.setQuickFilter).toHaveBeenCalledWith('search text');
  // });

  it('should toggle column list visibility', () => {
    expect(component.showColumnList).toBeFalse();

    component.toggleColumnListVisibility();

    expect(component.showColumnList).toBeTrue();

    component.toggleColumnListVisibility();

    expect(component.showColumnList).toBeFalse();
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

  // it('should add a new row', () => {
  //   const initialRowCount = component.rowData.length;

  //   component.addRow();

  //   expect(gridApi.applyTransaction).toHaveBeenCalled();
  //   expect(component.rowData.length).toBe(initialRowCount + 1);
  //   expect(component.rowData[component.rowData.length - 1].addMode).toBeTrue();
  // });
});
