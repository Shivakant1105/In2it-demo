import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headerSub = new BehaviorSubject({links:'',module:''});
  constructor() { }
  setHeader(data:{links:string,module:string}){
    this.headerSub.next(data);
  }

getTableData() {
  return JSON.parse(localStorage.getItem('data')!)
}
addTask(data: any) {
  const localData = JSON.parse(localStorage.getItem('data')!)||[];
  localData.push(data)
  localStorage.setItem('data', JSON.stringify(localData));
}
deleteTask(id:any){
  const localData = JSON.parse(localStorage.getItem('data')!)||[];
  localData.splice(id,1)
  localStorage.setItem('data', JSON.stringify(localData));

}

public tableDataSubject = new Subject<any>();
  tableData$ = this.tableDataSubject.asObservable();
  setTableData(data: any) {
    this.tableDataSubject.next(data);
    console.log("data service",data);
    
  }
//  private baseUrl 
//   getWorkflowData(id: number): Observable<any> {
//     const url = `${this.}/workflows/${id}`; 
//     return this.http.get<any>(url);
//   }
}