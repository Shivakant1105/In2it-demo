import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskComponent } from './my-task.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('MyTaskComponent', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;

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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data from localStorage on ngOnInit', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([{ id: '1', solutionArea: 'Area1' }])
    );

    component.ngOnInit();

    expect(component.formData).toEqual([{ id: '1', solutionArea: 'Area1' }]);
  });

  it('should initialize gridOptions context', () => {
    component.addFormInit();

    expect(component.gridOptions.context.parentComponent).toBe(component);
    expect(component.gridOptions.context.parent).toBe('task');
  });
  
});
