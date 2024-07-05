import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Dashboard/service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
  setHeader(links: string, module: string) {
    this.dataService.setHeader({ links, module });
  }
}
