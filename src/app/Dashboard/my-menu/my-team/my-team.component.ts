import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';



@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
  } 
  data:string="Hello we recive the data "
  @ViewChild('child1') child1!: ChildComponent;

  parentDataToChild1: any = { message: 'Data from parent to child1' };
  onDataFromChild(data: any) {
    console.log('Data received from child1:', data);
  }

  
  sendDataToChild1() {
    this.child1.receiveDataFromParent(this.parentDataToChild1);
  }
  

  
}
