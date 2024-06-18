import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableData } from '../Models/products-list';
// import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  private dbUrl = 'http://localhost:3000/resData';

  constructor(private http: HttpClient) {}
  // getProductsList(): Observable<TableData[]> {
  //   return this.http.get<TableData[]>(this.dbUrl);
  // }
  getProductsList() {
   const data=this.http.get<TableData>(this.dbUrl);
  //  console.log(JSON.parse(data));
   
console.log(data);
return this.http.get<TableData>(this.dbUrl);
  }
 
  }

