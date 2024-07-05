import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  // // receive data from parent
  // receiveDataFromParent(data: any) {
  //   console.log('Data received in child:', data);
  //   // Sending data from child to parent
   
  // }
  // sendDataToParent(){
  //   this.dataEvent.emit('Data from child');
  // }

}
