import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonComponent } from './action-button.component';
import { ICellRendererParams } from 'ag-grid-community';
describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;
  let mockParams: ICellRendererParams;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    mockParams = {
      data: { id: 1, name: 'Test Task' },
      colDef: { field: 'name' },
      node:{ data: { id: 1, name: 'Test Task' },},
      context: {
        parentComponent: {
          onEdit: jasmine.createSpy('onEdit'),
          addTask: jasmine.createSpy('addTask'),
          onDelete: jasmine.createSpy('onDelete')
        }
      },
      api:jasmine.createSpyObj('api',['applyTransaction'])

    } as ICellRendererParams;
    component.agInit(mockParams);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize params and fieldName on agInit', () => {
    expect(component.params).toBe(mockParams);
    expect(component.fieldName).toBe('name');
  });

  it('should refresh the component with new params', () => {
    const newParams: ICellRendererParams = { ...mockParams, data: { id: 2, name: 'New Task' } };
    const refreshResult = component.refresh(newParams);
    expect(refreshResult).toBeTrue();
    expect(component.params.data.name).toBe('New Task');
  });

  it('should call parentComponent onEdit and addTask methods on editTask', () => {
    component.editTask();
    expect(mockParams.context.parentComponent.onEdit).toHaveBeenCalledWith(mockParams.data);
    expect(mockParams.context.parentComponent.addTask).toHaveBeenCalled();
  });

  it('should call parentComponent onDelete method on deleteTask', () => {
    component.deleteTask();
    expect(mockParams.context.parentComponent.onDelete).toHaveBeenCalledWith(mockParams.data);
  });  
  it('should set edit_mode to true and  ', () => {

    component.params.data = { edit_mode: false };

    component.onEditClick();

    expect(component.params.data.edit_mode).toBeTrue();
    const expectedData = { edit_mode: false };
    expect(component.params.data.updateData).toEqual(expectedData);
  });

  it('should delete row', () => {
      component.deleteRow();
    expect(mockParams.api.applyTransaction).toHaveBeenCalledWith({
      remove: [mockParams.node.data],
    });                             
  });

  
  it('should confirm edit when addMode is true', () => {
    component.params = {
      data: {
        addMode: true,
        updateData: {
          table_name: { value: 'New Table Name' },
          description: { value: 'New Description' }
        },
        table_name: { value: 'New Table Name' },
        description: { value: 'New Description' }
      }
    };

    component.confirmEdit();

    expect(component.params.data.addMode).toBeUndefined();
    expect(component.params.data.table_name.value).toBe('New Table Name');
    expect(component.params.data.description.value).toBe('New Description');
    expect(component.params.data.updatedData).toBeUndefined();
  });

  it('should confirm edit when addMode is false', () => {
    component.params = {
      data: {
        addMode: false,
        updateData: {
          table_name: { value: 'Updated Table Name' },
          description: { value: 'Updated Description' }
        },
        table_name: { value: 'New Table Name' },
        description: { value: 'New Description' }
      }
    };

    component.confirmEdit();

    expect(component.params.data.edit_mode).toBe(false);
    expect(component.params.data.table_name.value).toBe('Updated Table Name');
    expect(component.params.data.description.value).toBe('Updated Description');
    expect(component.params.data.updateData).toBeUndefined();
  });

  it('should cancel edit when addMode is true', () => {
    // Prepare test data
    component.params = {
      api: {
        applyTransaction: jasmine.createSpy('applyTransaction')
      },
      node: {
        data: { /* Provide mock data here */ }
      },
      data: {
        addMode: true
      }
    };

    // Call the cancelEdit method
    component.cancelEdit();

    // Assert applyTransaction was called with the correct data
    expect(component.params.api.applyTransaction).toHaveBeenCalledWith({
      remove: [component.params.node.data]
    });
  });

  it('should cancel edit when addMode is false', () => {
    // Prepare test data
    component.params = {
      data: {
        addMode: false,
        updateData: { }
      }
    };

    component.cancelEdit();

    expect(component.params.data.edit_mode).toBe(false);
    expect(component.params.data.updateData).toBeUndefined();
  });
});
