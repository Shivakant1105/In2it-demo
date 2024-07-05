import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})
export class SolutionComponent implements OnInit {
  // outerForm!: FormGroup;

  constructor(
    // private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.outerForm = this.fb.group({
    //   outerArray: this.fb.array([]),
    // });
  }

  // onSubmit() {
  //   console.log(this.outerForm.value);
  // }

  // get outerArray(): FormArray {
  //   return this.outerForm.get('outerArray') as FormArray;
  // }
  // innerArray(ind: any): FormArray {
  //   return this.outerArray.at(ind).get('innerArray') as FormArray;
  // }
  // addOuterItem() {
  //   this.outerArray.push(this.createOuterGroup());
  // }

  // removeOuterItem(index: number) {
  //   this.outerArray.removeAt(index);
  // }

  // addInnerField(outerIndex: number) {
  //   const k = this.outerArray.at(outerIndex) as FormGroup;
  //   const innerArray = k.get('innerArray') as FormArray;
  //   innerArray.push(this.createInnerGroup());
  // }
  // removeInnerField(outerIndex: number, innerIndex: number) {
  //   const outerGroup = this.outerArray.at(outerIndex) as FormGroup;
  //   const innerArray = outerGroup.get('innerArray') as FormArray;
  //   innerArray.removeAt(innerIndex);
  // }

  // createOuterGroup() {
  //   return this.fb.group({
  //     outerField: [''],
  //     innerArray: this.fb.array([]),
  //   });
  // }

  // createInnerGroup() {
  //   return this.fb.group({
  //     innerField: [''],
  //   });
  // }
}
