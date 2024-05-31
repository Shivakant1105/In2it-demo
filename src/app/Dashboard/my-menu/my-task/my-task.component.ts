import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';


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
    const alert=confirm("Are you sure add the data.?")
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

//   formData: any[] = [];
//   addForm!: FormGroup;
//   addData: boolean = false;

//   constructor(public fb: FormBuilder, private service: DataService) {}

//   ngOnInit(): void {
//     this.addFormInit();
//     this.formData = JSON.parse(localStorage.getItem('data') || '[]');
//   }
//   addFormInit() {
//     this.addForm = this.fb.group({
//       id: [''],
//       solutionArea: [''],
//       workflow: [''],
//       taskId: [''],
//       taskName: [''],
//       status: [''],
//       startDue: [''],
//       dueDate: [''],
//       priority: [''],
//     });
//   }

//   onSubmit() {
//     this.service.addTask(this.addForm.value);
//     this.formData.push(this.addForm.value);
//     console.log(this.formData);
//   }
//   onClear() {
//     this.addForm.reset();
//   }

//   onDelete(id: any) {
//     this.service.deleteTask(id);
//     this.formData.splice(id, 1);
//   }
//   onEdit(){}
//   addTask() {
//     this.addData = !this.addData;
//   }
//   cancel() {
//     this.addData = !this.addData;
//   }
// }


// *ngIf ='!firzt nasme ?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 


// addForm!: FormGroup;
//   formData: any[] = [];
//   addData: boolean = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private dataService: DataService
//   ) { }

//   ngOnInit(): void {
//     this.addForm = this.formBuilder.group({
//       id: [''],
//       solutionArea: [''],
//       workflow: [''],
//       taskId: [''],
//       taskName: [''],
//       status: [''],
//       startDue: [''],
//       dueDate: [''],
//       priority: ['']
//     });
//     this.loaddata();
//   }

//   loaddata() {
//     this.formData = this.dataService.getdata();
//   }

//   onSubmit() {
//     if (this.addForm.valid) {
//       this.dataService.addTask(this.addForm.value);
//       this.loaddata();
//       this.addForm.reset();
//     }
//   }

//   onEdit(index: number) {

//     const updatedTask = this.addForm.value;
//     this.dataService.updateTask(index, updatedTask);
//     this.loaddata();
   
//     this.addForm.reset();
//   }

//   onDelete(index: number) {
//     this.dataService.deleteTask(index);
//     this.loaddata();
//   }

//   addTask() {
//         this.addData =! this.addData;
//         console.log(this.addData);
//       }



//   onClear(){this.addForm.reset();}



// cancel() {
//     this.addData =! this.addData;
//     console.log(this.addData);
//   }
// }





















//   addData: boolean = false;

//   formData: any[] = [];
// addForm!: FormGroup;
// data: any;
//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
// this.addForm = this.fb.group({
//   id: ['' ],
//   solutionArea: ['' ],
//   workflow: ['' ],
//   taskId: ['' ],
//   taskName: ['' ],
//   status: ['' ],
//   startDue: ['' ],
//   dueDate: ['' ],
//   priority: [''   ]
// });

// const storedFormData = localStorage.getItem('formData');
// if (storedFormData) {
//   this.data.push(JSON.parse(storedFormData));
// }
// this.loadDataFromLocalStorage();
// this.data =JSON.parse( localStorage.getItem('formData')!)
// console.log(this.data)
// }

// loadDataFromLocalStorage() {
//   const data = JSON.parse(localStorage.getItem('formData') || '[]');
//   this.formData = data;
// }
// onSubmit() {

//   const oldData =JSON.parse( localStorage.getItem('formData')!)||[];
//   console.log(oldData)
//   oldData.push(this.addForm.value);
//   localStorage.setItem('formData', JSON.stringify(oldData));
// console.log(this.addForm.value);

//   this.formData.push(this.addForm.value);
//   localStorage.setItem('formData', JSON.stringify(this.formData));
// }

// onClear() {
//   this.addForm.reset();
// localStorage.removeItem('formData');
// this.data = [];
//   }
//   onDelete(){
//     localStorage.removeItem('formData');
//     this.data = [];
//   }

//   addTask() {
//     this.addData =! this.addData;
//     console.log(this.addData);
//   }
//
