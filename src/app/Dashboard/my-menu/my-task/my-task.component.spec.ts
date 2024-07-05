import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskComponent } from './my-task.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('MyTaskComponent', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTaskComponent ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data from localStorage on ngOnInit', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ id: '1', solutionArea: 'Area1' }]));

    component.ngOnInit();

    expect(component.formData).toEqual([{ id: '1', solutionArea: 'Area1' }]);

    expect(component.addForm.get('id')?.value).toBe('');
    expect(component.addForm.get('solutionArea')?.value).toBe('');
    expect(component.addForm.get('workflow')?.value).toBe('');
    expect(component.addForm.get('taskId')?.value).toBe('');
    expect(component.addForm.get('taskName')?.value).toBe('');
    expect(component.addForm.get('status')?.value).toBe('');
    expect(component.addForm.get('startDue')?.value).toBe('');
    expect(component.addForm.get('dueDate')?.value).toBe('');
    expect(component.addForm.get('priority')?.value).toBe('');
  });

  it('should initialize gridOptions context', () => {
    component.addFormInit();

    expect(component.gridOptions.context.parentComponent).toBe(component);
    expect(component.gridOptions.context.parent).toBe('task');
  });
});
