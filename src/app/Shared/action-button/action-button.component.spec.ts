import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonComponent } from './action-button.component';
describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
       component.params = {
      context: {},
      data: {
        addMode: false,
        edit_mode: false,
        table_name: { value: '' },
        description: { value: '' },
        updateData: {
          table_name: { value: 'Updated Table Name' },
          description: { value: 'Updated Description' }
        }
      }
    };
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call onEdit and addTask when parentComponent is task', () => {
  //   component.params.context.parentComponent = 'task';
  //   // component.params.data = { edit_mode: false };
  //   component.onEditClick();
  //   expect(component.params.context.parentComponent.onEdit()).toHaveBeenCalledWith(component.params.data);
  //   expect(component.params.context.parentComponent.addTask()).toHaveBeenCalled();
  // });

  it('should set edit_mode to true and update data when parentComponent is not task', () => {
    component.params.context.parentComponent = 'otherComponent';
    component.params.data = { edit_mode: false };

    component.onEditClick();

    expect(component.params.data.edit_mode).toBeTrue();
    const expectedData = { edit_mode: false };
    expect(component.params.data.updateData).toEqual(expectedData);
  });

  // it('should delete row if',()=>{
  //   component.params.parentComponent='task';
  //   component.deleteRow();
  //   expect(component.params.context.parentComponent.onDelete()).toHaveBeenCalledWith(component.params.data)
  // })
  
});
