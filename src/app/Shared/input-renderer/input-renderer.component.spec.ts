import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRendererComponent } from './input-renderer.component';
import { ICellRendererParams } from 'ag-grid-community';

describe('InputRendererComponent', () => {
  let component: InputRendererComponent;
  let fixture: ComponentFixture<InputRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRendererComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with agInit', () => {
    const params: ICellRendererParams = {
      value: 'test value',
      colDef: { field: 'testField' },
    } as ICellRendererParams;

    component.agInit(params);

    expect(component.params).toEqual(params);
    expect(component.fieldName).toBe('testField');
  });

  it('should refresh with new params', () => {
    const initialParams: ICellRendererParams = {
      value: 'initial value',
      colDef: { field: 'initialField' },
    } as ICellRendererParams;

    const newParams: ICellRendererParams = {
      value: 'new value',
      colDef: { field: 'newField' },
    } as ICellRendererParams;

    component.agInit(initialParams);
    const result = component.refresh(newParams);

    expect(component.params).toEqual(newParams);
    expect(result).toBeTrue();
  });

  it('should do nothing on ngOnInit', () => {
    component.ngOnInit();
    expect(true).toBeTrue();
  });
});
