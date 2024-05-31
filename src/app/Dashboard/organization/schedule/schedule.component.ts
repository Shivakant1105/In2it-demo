import { Root, percent } from '@amcharts/amcharts5';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as am5 from '@amcharts/amcharts5';

import * as am5xy from '@amcharts/amcharts5/xy';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
interface Contact {
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  phone: string;
  role: string;
}
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent   {
  addData!:boolean
  form: FormGroup;
  submittedData: any[]=[];
 constructor(private fb: FormBuilder){
  this.form = this.fb.group({
     name:this.fb.group({firstName: [''],
     lastName: [''],}),
    

  organization: [''],
  email: [''],
  phones: this.fb.array([
    this.createPhoneFormGroup()
  ]),
  roles:[''],
  additionalRoles: [''],
  remark: ['']
});
 }
 createPhoneFormGroup(): FormGroup {
  return this.fb.group({
    type: [''],
    number: ['']
  });
}

get phonesFormArray(): FormArray {
  return this.form.get('phones') as FormArray;
}

addPhone(): void {
  this.phonesFormArray.push(this.createPhoneFormGroup());
}

removePhone(index: number): void {
  this.phonesFormArray.removeAt(index);
}

onSubmit(): void {
  this.submittedData = this.form.value;
  console.log("Form data:", this.submittedData);
}
onClear(){}
cancel(){ this.addData = false;}
}