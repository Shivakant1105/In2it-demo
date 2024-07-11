import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskComponent } from './my-task.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DataService } from '../../service/data.service';

describe('MyTaskComponent', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;
  let service: DataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTaskComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should add a task when form is valid and not in edit mode', () => {
      component.formData = [{  
        id: '',
        solutionArea: '',
        workflow: '',
        taskId: '' ,
        taskName:'' ,
        status: '',
        startDue: '',
        dueDate: '',
        priority: ''
      }];
      component.editMode = false;
      component.onSubmit();
      expect(component.formData.length).toBe(1);
      expect(component.addForm.value).toEqual(component.formData[0]);

      // expect(localStorage.getItem('data')).toBe(JSON.stringify(component.formData));
    });

    it('should edit a task when form is valid and in edit mode', () => {
      component.formData = [{  
        id: '',
        solutionArea: '',
        workflow: '',
        taskId: '' ,
        taskName:'' ,
        status: '',
        startDue: '',
        dueDate: '',
        priority: ''
      }];
      component.editMode = true;
      component.editIndex = 0;

      component.onSubmit();

      expect(component.formData[0]).toEqual(component.addForm.value);
      // expect(component.editMode).toBeTrue();
      // expect(localStorage.getItem('data')).toBe(JSON.stringify(component.formData));
    });

    it('should mark form fields as touched when form is invalid', () => {
      component.addForm.setErrors({ invalid: true });
      spyOn(component.addForm, 'markAllAsTouched');
      component.onSubmit();
      // expect(component.addForm.markAllAsTouched).toHaveBeenCalled();
    });
  });

  describe('onClear', () => {
    it('should reset the form and edit mode', () => {
      component.onClear();

      expect(component.addForm.value).toEqual(component.addForm.getRawValue());
      expect(component.editMode).toBeFalse();
      expect(component.editIndex).toBe(-1);
    });
  });

  describe('onDelete', () => {
    it('should delete a task from formData', () => {
      spyOn(service, 'deleteTask');
      spyOn(window, 'confirm').and.returnValue(true);
      component.formData = [{ taskId: 1 }, { taskId: 2 }];

      component.onDelete(0)
    });
  });

  describe('onEdit', () => {
    it('should set form values and edit mode correctly', () => {
      component.formData = [{ 
        /* task data */ 
        id: '',
        solutionArea: '',
        workflow: '',
        taskId: '' ,
        taskName:'' ,
        status: '',
        startDue: '',
        dueDate: '',
        priority: ''
      }];
      component.onEdit(0);

      expect(component.addData).toBeTrue();
      expect(component.editIndex).toBe(0);
      expect(component.editMode).toBeTrue();
      expect(component.addForm.value).toEqual(component.formData[0]);
    });
  });

  describe('addTask', () => {
    it('should set addData to true', () => {
      component.addTask();

      expect(component.addData).toBeTrue();
    });
  });

  describe('cancel', () => {
    it('should reset the form and edit mode', () => {
      component.cancel();

      expect(component.addData).toBeFalse();
      expect(component.editMode).toBeFalse();
      expect(component.editIndex).toBe(-1);
      expect(component.addForm.value).toEqual(component.addForm.getRawValue());
    });
  });
});