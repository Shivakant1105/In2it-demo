import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskComponent } from './my-task.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DataService } from '../../service/data.service';

describe('MyTaskComponent', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;
  let fb: FormBuilder;
  let service: jasmine.SpyObj<DataService>;
  // let service: DataService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('DataService', ['addTask', 'deleteTask']);
    await TestBed.configureTestingModule({
      declarations: [MyTaskComponent],
      imports: [
        ReactiveFormsModule,
        AgGridModule,
        FeatherModule.pick(allIcons),
      ],
      providers: [FormBuilder, { provide: DataService, useValue: service }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskComponent);
    component = fixture.componentInstance;
    // service = TestBed.inject(DataService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call ng onit', () => {
    spyOn(component, 'addFormInit');
    component.ngOnInit();
    expect(component.addFormInit).toHaveBeenCalled;
  });
  it('call ng onit', () => {
    spyOn(component, 'addFormInit');
    localStorage.removeItem('data')
    component.ngOnInit();
    expect(component.addFormInit).toHaveBeenCalled;
  });
  it(' ag init ', () => {
    const form = fb.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      solutionArea: ['', Validators.required],
      workflow: ['', Validators.required],
      taskId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      taskName: ['', Validators.required],
      status: ['', Validators.required],
      startDue: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
    });
    component.addForm = form;
    component.addFormInit();
  });
  it('cell style call active', () => {
    const { cellStyle }: any = component.columnDefs[5];
    cellStyle({ value: 'Active' });
  });
  it('cell style call Inactive', () => {
    const { cellStyle }: any = component.columnDefs[5];
    cellStyle({ value: 'Inactive' });
  });
  it('cell style call low ', () => {
    const { cellStyle }: any = component.columnDefs[8];
    cellStyle({ value: 'Low' });
  });
  it('cell style call Medium ', () => {
    const { cellStyle }: any = component.columnDefs[8];
    cellStyle({ value: 'Medium' });
  }); it('cell style call High ', () => {
    const { cellStyle }: any = component.columnDefs[8];
    cellStyle({ value: 'High' });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.addFormInit();
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.returnValue('[]');
      // spyOn(service, 'addTask');
    });

    it('should add task if form is valid and not in edit mode', () => {
      component.addForm.setValue({
        id: '1',
        solutionArea: 'Test Solution',
        workflow: 'Test Workflow',
        taskId: '101',
        taskName: 'Test Task',
        status: 'Pending',
        startDue: '2023-01-01',
        dueDate: '2023-01-31',
        priority: 'High',
      });
      component.editMode = false;
      component.onSubmit();
      expect(service.addTask).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled(
        // 'data',
        // JSON.stringify([component.addForm.value])
      );
      // expect(component.formData).toEqual([component.addForm.value]);
      // expect(component.addForm.value).toEqual({
      //   id: '1',
      //   solutionArea: 'Test Solution',
      //   workflow: 'Test Workflow',
      //   taskId: '101',
      //   taskName: 'Test Task',
      //   status: 'Pending',
      //   startDue: '2023-01-01',
      //   dueDate: '2023-01-31',
      //   priority: 'High',
      // });
    });

    it('should update task if form is valid and in edit mode', () => {
      component.addForm.setValue({
        id: '1',
        solutionArea: 'Test Solution',
        workflow: 'Test Workflow',
        taskId: '101',
        taskName: 'Test Task',
        status: 'Pending',
        startDue: '2023-01-01',
        dueDate: '2023-01-31',
        priority: 'High',
      });
      component.editMode = true;
      component.editIndex = 0;
      component.formData = [
        {
          id: '0',
          solutionArea: 'Old Solution',
          workflow: 'Old Workflow',
          taskId: '100',
          taskName: 'Old Task',
          status: 'Done',
          startDue: '2022-01-01',
          dueDate: '2022-01-31',
          priority: 'Low',
        },
      ];
      component.onSubmit();
      // expect(component.formData[0]).toEqual(component.addForm.value);
      
      // expect(component.addForm.value).toEqual({
      //   id: '',
      //   solutionArea: '',
      //   workflow: '',
      //   taskId: '',
      //   taskName: '',
      //   status: '',
      //   startDue: '',
      //   dueDate: '',
      //   priority: '',
      // });
      expect(component.editMode).toBeFalse();
    });

    it('should mark controls as touched if the form is invalid', () => {
      component.onSubmit();
      Object.keys(component.addForm.controls).forEach((field) => {
        const control = component.addForm.get(field);
        if (control) {
          expect(control.touched).toBeTrue();
        }
      });
    });
  });

  it('should clear the form and reset edit mode', () => {
    component.addForm = fb.group({
      name: 'test',
      id: 1,
    });

    component.onClear();
    expect(component.addForm.value).toEqual({
      name: null,
      id: null,
    });
    expect(component.editMode).toBeFalse();
    expect(component.editIndex).toEqual(-1);
  });
  it('should delete a task when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.formData = [
      {
        name: 'test',
        id: 1,
      },
    
    ];
    
    component.onDelete(0);

    expect(component.formData.length).toBe(0);
  });
  it('should delete a task when null', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    
  
    localStorage.removeItem('data')
    component.ngOnInit()
    component.onDelete(0);
console.log("my task dtaatasdvsadvg",localStorage.getItem('data'));

    
  });

  
  it('should set addData to true', () => {
    component.addData = false;

    component.addTask();

    expect(component.addData).toBeTrue();
  });

  it('should reset form and edit mode', () => {
    component.addForm = fb.group({
      name: 'test',
      id: 1,
    });

    component.addData = true;
    component.editMode = true;
    component.editIndex = 1;
    component.cancel();
    expect(component.addForm.value).toEqual({
      name: null,
      id: null,
    });
    expect(component.addData).toBeFalse();
    expect(component.editMode).toBeFalse();
    expect(component.editIndex).toBe(-1);
  });

  describe('onEdit', () => {
    beforeEach(() => {
      component.addFormInit();
      component.formData = [
        {
          id: '1',
          solutionArea: 'Solution A',
          workflow: 'Workflow A',
          taskId: '101',
          taskName: 'Task A',
          status: 'Pending',
          startDue: '2023-01-01',
          dueDate: '2023-01-31',
          priority: 'High',
        },
        {
          id: '2',
          solutionArea: 'Solution B',
          workflow: 'Workflow B',
          taskId: '102',
          taskName: 'Task B',
          status: 'Completed',
          startDue: '2023-02-01',
          dueDate: '2023-02-28',
          priority: 'Medium',
        },
      ];
    });

    it('should set `addData` to true', () => {
      component.onEdit(0);
      expect(component.addData).toBeTrue();
    });

    it('should set `editMode` to true', () => {
      component.onEdit(0);
      expect(component.editMode).toBeTrue();
    });

    it('should set `editIndex` to the provided index', () => {
      component.onEdit(1);
      expect(component.editIndex).toBe(1);
    });

    it('should populate the form with the selected task data', () => {
      const index = 0;
      component.onEdit(index);
      expect(component.addForm.value).toEqual(component.formData[index]);
    });
  });
});
