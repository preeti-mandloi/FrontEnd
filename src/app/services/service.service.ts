import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllProduct, Login, Order, Product } from '../models/product'; 
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
  return this.sendPostRequest( environment.usersUrl, data);
}
addProduct(product: Product): Observable<any> {
    return this.sendPostRequest( environment.usersUrl+'/product/addProduct', product);
  }
getAllProduct(): Observable<any> {
  return this.sendGETRequest( environment.usersUrl+'/product/getAllProducts');
}
 addOrder(order:any):Observable<any>{
    return this.sendPostRequest(environment.usersUrl+'/order/addProductInOrder',order);
  }
}