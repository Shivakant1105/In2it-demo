import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ICellRendererParams } from 'ag-grid-community';
// import { Subject } from 'rxjs';

// import { TableData } from '../Models/products-list';

// import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  private dbUrl = 'http://localhost:3000/resData';
  // private dbUrl1 = "http://localhost:3000/resData/{table_id}"

  constructor(private http: HttpClient) {}
  
  getProductsList() {
return this.http.get<any>(this.dbUrl,{ headers: { Accept: 'application/json' } });
  }

  //  editStateSubject = new Subject<ICellRendererParams>()


  // setEditState(data:any) {
  //   this.editStateSubject.next(data);
  // }


  }

