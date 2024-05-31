import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DataService } from 'src/app/Dashboard/service/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private dataService: DataService) {  
    this.dataService.headerSub.pipe(takeUntil(
      this.unsubSubject)).subscribe((data:any)=>
         this.header = data);}

  header: {links:string,module:string} ={
    links: '',
    module: ''
  }
  unsub = new Subscription();
  unsubSubject = new Subject();
  
 
  ngOnInit(): void {
  }
 
  ngOnDestroy(): void {
    this.unsubSubject.next(null);
    this.unsubSubject.complete();
  }


  }


