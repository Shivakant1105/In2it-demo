import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ActionButtonComponent } from 'src/app/Shared/action-button/action-button.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent implements OnInit {
  items = [
    {
      icon: 'user',
      title: 'Assign to me',
      count: '1',
    },
    {
      icon: 'align-right',
      title: 'In Queue',
      count: '55',
    },
    {
      icon: 'alert-triangle',
      title: 'Overdue',
      count: '56',
    },
    {
      icon: 'Star',
      title: 'Priority',
      count: '46',
    },
  ];

  formData: any[] = [];
  addForm!: FormGroup;
  addData: boolean = false;
  editMode: boolean = false;
  editIndex: number = -1;

  gridOptions!: GridOptions;
  columnDefs: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: 'Solution Area', field: 'solutionArea' },
    { headerName: 'Workflow', field: 'workflow' },
    { headerName: 'TaskId', field: 'taskId' },
    { headerName: 'Task Name', field: 'taskName' },
    {
      headerName: 'Status',
      field: 'status',
      cellStyle: (params) => {
        let style = { backgroundColor: '', color: '' };
        switch (params.value) {
          case 'Active':
            style.backgroundColor = 'blue';
            style.color = 'white';
            break;
          case 'Inactive':
            style.backgroundColor = 'pink';
            style.color = 'black';
            break;
          default:
            break;
        }
        return style;
      },
    },
    { headerName: 'StartDate', field: 'startDue' },
    { headerName: 'DueDate', field: 'dueDate' },
    {
      headerName: 'Priority',
      field: 'priority',
      cellStyle: (params) => {
        let style = { backgroundColor: '', color: '' };
        switch (params.value) {
          case 'High':
            style.backgroundColor = 'red';
            style.color = 'white';
            break;
          case 'Medium':
            style.backgroundColor = 'green';
            style.color = 'white';
            break;
          case 'Low':
            style.backgroundColor = 'yellow';
            style.color = 'black';
            break;
          default:
            break;
        }
        return style;
      },
    },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: ActionButtonComponent,
    },
  ];

  constructor(public fb: FormBuilder, private service: DataService) {}

  ngOnInit(): void {
    this.addFormInit();
    this.formData = JSON.parse(localStorage.getItem('data') || '[]');
  }

  addFormInit() {
    this.addForm = this.fb.group({
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

    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'task',
      },
    };
  }

  onSubmit() {
    if (this.addForm.valid) {
      if (this.editMode) {
        this.formData[this.editIndex] = this.addForm.value;
        this.editMode = false;
      } else {
        this.service.addTask(this.addForm.value);
        this.formData.push(this.addForm.value);
      }
      localStorage.setItem('data', JSON.stringify(this.formData));
      this.formData = JSON.parse(localStorage.getItem('data') || '[]');
      this.addForm.reset();
    } else {
      console.log('Form is invalid');
      Object.keys(this.addForm.controls).forEach((field) => {
        const control = this.addForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
    this.addData = false;
  }

  onClear() {
    this.addForm.reset();
    this.editMode = false;
    this.editIndex = -1;
  }

  onDelete(index: any) {
    const msg = confirm('Are you sure you want to delete this item?');
    if (msg) {
      const taskId = this.formData[index].taskId;
      this.service.deleteTask(taskId);
      this.formData.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(this.formData));
    }
  }

  onEdit(index: any) {
    this.addData = true;
    this.editIndex = index;
    this.editMode = true;
    // this.addForm.patchValue(this.formData[index]);
    this.addForm.patchValue(index);
  }

  addTask() {
    this.addData = true;
  }

  cancel() {
    this.addData = false;
    this.editMode = false;
    this.editIndex = -1;
    this.addForm.reset();
  }
}
