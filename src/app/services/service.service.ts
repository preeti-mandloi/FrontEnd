import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, Product } from '../models/product'; 
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
public admin(payload :any): Observable<any> {
  return this.sendPostRequest( environment.usersUrl+'/createAdmin', payload);
}
  public addProduct(product: Product): Observable<any> {
    return this.sendPostRequest( environment.usersUrl+'/product/addProduct', product);
  }
  public addOrder(order:Order):Observable<any>{
return this.sendPostRequest(environment.usersUrl+'/product/addOrder',order);
  }
}