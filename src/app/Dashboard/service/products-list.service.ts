import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableData } from '../Models/products-list';


@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  private dbUrl = 'assets/db.json';
  constructor(private http:HttpClient) { }

  getProductsList() {
    return this.http.get<TableData>(this.dbUrl);
  }
 
  
  }

