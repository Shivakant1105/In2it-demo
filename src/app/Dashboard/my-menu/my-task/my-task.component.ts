import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { ColDef } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/Shared/custom-cell/custom-cell.component';


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


  columnDefs: ColDef[] = [
    
    {headerCheckboxSelection: true, 
      checkboxSelection: true, 
     
    },
    { headerName: 'Solution Area', field: 'solutionArea',   
      cellRenderer: (params: any) => {
      const linkElement = document.createElement('a');

      linkElement.innerText = params.value;
      linkElement.addEventListener('click', (event) => {
        event.preventDefault();
      ;

        console.log("ajkhfjhdjkshfd")
      });
      return linkElement;
    }, },
    { headerName: 'Workflow', field: 'workflow' },
    { headerName: 'TaskId', field: 'taskId' },
    { headerName: 'Task Name', field: 'taskName' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'StartDate', field: 'startDue' },
    { headerName: 'DueDate', field: 'dueDate' },
    { headerName: 'Priority', field: 'priority' },
    { headerName: 'Action', field: 'action' , cellRenderer:CustomCellComponent}
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
      taskId: ['',  [Validators.required, Validators.pattern('^[0-9]+$')]], 
      taskName: ['', Validators.required], 
      status: ['', Validators.required], 
      startDue: ['', Validators.required], 
      dueDate: ['', Validators.required], 
      priority: ['', Validators.required], 
    });
  }
  
  
  onSubmit() {
   if(this.addForm.valid){
    // const alert=confirm("Are you sure add the data.?")
    if (this.editMode) {
      this.formData[this.editIndex] = this.addForm.value;
      this.editMode = false;
    } else {
      this.service.addTask(this.addForm.value);
      this.formData.push(this.addForm.value);
    }
    localStorage.setItem('data', JSON.stringify(this.formData));
    this.addForm.reset();
  }
  else{
    console.log("Form is invalid");
    Object.keys(this.addForm.controls).forEach(field => {
      const control = this.addForm.get(field);
      if (control) {
          control.markAsTouched({ onlySelf: true });
      }
  });
  }
  }
  onClear() {
    this.addForm.reset();
    this.editMode = false;
    this.editIndex = -1;
  }
  
  onDelete(index: number) {
    const msg = confirm("Are you sure you. want to delete this item?")
    if(msg){
    const taskId = this.formData[index].taskId; 
    this.service.deleteTask(taskId);  
    this.formData.splice(index, 1); 
    localStorage.setItem('data', JSON.stringify(this.formData)); }
  }
  onEdit(index: number) {
    this.editIndex = index;
    this.editMode = true;
    this.addForm.patchValue(this.formData[index]);
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
