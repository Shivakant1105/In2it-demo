import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {  

  private dbUrl = 'http://localhost:3000/resData';
  constructor(private http: HttpClient) {}
  
  getProductsList() {
return this.http.get<any>(this.dbUrl,{ headers: { Accept: 'application/json' } });
  }


  }

