import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreageService {
  private cartChanged = new BehaviorSubject<number>(0);
  cartChanged$ = this.cartChanged.asObservable();

  constructor() {
    const cart = this.getData('cart') || [];
    this.cartChanged.next(cart.length);
  }

  public saveData(key: string, value: any) {
    if (key === 'token') {
      localStorage.setItem(key, value)
    }
    else {
      localStorage.setItem(key, JSON.stringify(value))
      if (key === 'cart') {
        const cart = value || [];
        this.cartChanged.next(cart.length);
      }
    }
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : [];

  }

  public removeData(key: string) {
    localStorage.removeItem(key)
    if (key === 'cart') {
      this.cartChanged.next(0);
    }
  }

  public clearData() {
    localStorage.clear()
  }
}