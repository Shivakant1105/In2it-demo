import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListService } from '../../service/products-list.service';
import { ProductTableListComponent } from './product-table-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
import { GridApi } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { InputRendererComponent } from 'src/app/Shared/input-renderer/input-renderer.component';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

describe('ProductTableListComponent', () => {
  let component: ProductTableListComponent;
  let fixture: ComponentFixture<ProductTableListComponent>;

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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should add a new row', () => {
    component.addRow();
    expect(gridApi.applyTransaction).toHaveBeenCalled();
  });
});
