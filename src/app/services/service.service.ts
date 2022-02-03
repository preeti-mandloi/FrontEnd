import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Order, Product } from '../models/product'; 
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  sendGETRequest(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get(url, httpOptions);
}

sendPostRequest(url: string, body: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
  return this.http.post(url, body, httpOptions);
}
 admin(data:Login): Observable<any> {
  return this.sendPostRequest( environment.usersUrl+'/login', data);
}
addProduct(product: Product): Observable<any> {
    return this.sendPostRequest( environment.usersUrl+'/addProduct', product);
  }
 addOrder(order:Order):Observable<any>{
return this.sendPostRequest(environment.usersUrl+'/addProductInOrder',order);
  }
}