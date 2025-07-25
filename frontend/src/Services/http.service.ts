import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Order } from '../Model/orderModel';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  baseurl = 'http://localhost:3000/'
  login(data: any) {
    return this.http.post(`${this.baseurl}users/login`, data);
  }
  signup(data: any) {
    return this.http.post(`${this.baseurl}users/register`, data);
  }
  
 getAllProducts(data: any) {
    return this.http.get(`${this.baseurl}products/getAllProducts`, { params: data })
  }

  AddOrder(data: any) {
    return this.http.post(`${this.baseurl}order/AddOrder`, data)
  }

  AddItems(data: any) {
    return this.http.post(`${this.baseurl}order-items/AddItems`, data)
  }

  GetOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseurl}order/getallorders`)
  }

  AddAddress(data: any) {
    return this.http.post(`${this.baseurl}user-address/createNewAddress`, data)
  }

  GetAddress() {
    return this.http.get(`${this.baseurl}user-address/getalladdress`)
  }

  AddCard(data: any) {
    return this.http.post(`${this.baseurl}user-card/AddNewCard`, data)
  }
}
