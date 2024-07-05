import { Component, OnInit, } from '@angular/core';
import { DecimalPipe } from '@angular/common';
// import { FormControl } from '@angular/forms';

// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';
// import { DataService } from '../service/data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [DecimalPipe]
})
export class SettingComponent implements OnInit {

  // contactData$: Observable<any>;
  // filter = new FormControl('');
  // contactData: any=[];
  // organizations: any;

  constructor(
    // pipe: DecimalPipe, public dataService: DataService
  ) { 
    // this.contactData$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.search(text, pipe))
    // );
   
    
  }
  ngOnInit(){
    // this.dataService.allData.subscribe((data: any) => {
    //   this.contactData = data;
      // this.organizations = data;
      // let arr=[]
      // for(let i=0;i<this.organizations.length;i++)
      //   {  
      //   for(let j=0;j<this.organizations[i].contact.length;j++){
      //     let data = this.organizations[i].contact[j]
      //     data.organization=this.organizations[i].organization
      //     data.id=this.organizations[i].id

      //      arr.push(data)

      //   }

      // }
      // console.log(arr)
      // this.contactData = arr;
      // console.log("service data", this.contactData);
      
    // });
  }

  // search(text: string, _pipe: PipeTransform) {
  //   return this.contactData.map((country: any) => {
  //     return {
  //       ...country,
  //       contact: country.contact.filter((contact: any) => {
  //         const term = text.toLowerCase();
  //         return (
  //           (contact.name && contact.name.toLowerCase().includes(term)) ||
  //           (contact.role && contact.role.toLowerCase().includes(term)) ||
  //           (contact.email && contact.email.toLowerCase().includes(term)) ||
  //           (contact.number && contact.number.toLowerCase().includes(term))
  //         );
  //       })
  //     };
  //   }).filter((country: any) => country.contact.length > 0);
  // }
  
  
  // search(text: string, pipe: PipeTransform) {
  //   return this.contactData.filter((data: any) => {
  //     const term = text.toLowerCase();
  //     return data.contact.some((contact: any) => {
  //       return (
  //         (data.organization && data.organization.toLowerCase().includes(term)) ||
  //         (contact.name && contact.name.toLowerCase().includes(term)) ||
  //         (contact.role && contact.role.toLowerCase().includes(term)) ||
  //         (contact.email && contact.email.toLowerCase().includes(term)) ||
  //         (contact.number && contact.number.toLowerCase().includes(term)) 
  //       );
  //     });
  //   });
  // }
  
  //  search(text: string , pipe: PipeTransform) {
  //   return this.contactData.filter((contact:any) => {
  //     const term = text.toLowerCase();
  //     return contact.organization && contact.organization.toLowerCase().includes(term)||
  //             (contact.name && contact.name.toLowerCase().includes(term)) ||
  //             (contact.role && contact.role.toLowerCase().includes(term)) ||
  //             (contact.email && contact.email.toLowerCase().includes(term)) ||
  //             (contact.number && contact.number.toLowerCase().includes(term)) 

  //   });
    
  // }
}
