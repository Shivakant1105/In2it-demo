import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  navs = [1];
  counter = this.navs.length + 1;
  active: number=0  ;

  // tabs = [
  //   { title: 'Tab 1', content: 'Content for Tab 1' },
  //   { title: 'Tab 2', content: 'Content for Tab 2' },
  //   { title: 'Tab 3', content: 'Content for Tab 3' },
  //   { title: 'Tab 4', content: 'Content for Tab 4' },
  //   { title: 'Tab 5', content: 'Content for Tab 5' }
  // ];
  activeTab = 0;
  selectedOrganization: any;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    // this.dataService.sendOrganizationDetails$.subscribe(org => {
    //   this.selectedOrganization = org;
    // });
  }

  // activateTab(index: number): void {
  //   this.activeTab = index;
  // }
  trackById(index: number, item: any): number {
    return index;
  }


  close(event: MouseEvent, toRemove: number) {
    this.navs = this.navs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopPropagation();
  }

  add(event: MouseEvent) {
    this.navs.push(this.counter++);
    event.preventDefault();
  }
  
  

}
