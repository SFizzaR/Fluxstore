import { Component } from '@angular/core';
import { LocalstoreageService } from '../../Services/localstoreage.service';
import { dataService } from '../../Services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private localstoreage: LocalstoreageService, private dataservice: dataService, private router: Router) { }
  products: any[] = []
  total = 0
  ngOnInit() {
    this.products = this.localstoreage.getData('cart') || []
    console.log(this.products)
    this.total = this.CalculateTotal()
    console.log(this.total)
    this.dataservice.setTotal(this.total)
  }

  getProducts() {
    return this.products
  }

  updateQuantity(item: any) {
    let cart = this.localstoreage.getData('cart') || [];
    const existingItem = cart.find((p: any) => p.Id === item.Id);
    if (existingItem) {
      existingItem.Quantity = item.Quantity;
      if (existingItem.Quantity <= 0) {
        cart = cart.filter((p: any) => p.Id !== item.Id);
      }
      this.localstoreage.saveData('cart', cart);
      this.products = cart;
      this.total = this.CalculateTotal()
    }
  }

  removeItem(item: any) {
    let cart = this.localstoreage.getData('cart') || [];
    cart = cart.filter((p: any) => p.Id !== item.Id);
    this.localstoreage.saveData('cart', cart);
    this.products = cart;
    this.total = this.CalculateTotal()
  }

  CalculateTotal(): number {
    let total = 0
    for (let index = 0; index < this.products.length; index++) {
      total += (this.products[index].Price * this.products[index].Quantity)
    }
    return Math.round(total * 100) / 100; // rounds to 2 decimal places
  }

  returnToShop() {
    this.dataservice.setPage('Shop')
    this.router.navigate(['/root/shop'])
  }

  handleCheckout() {
    if (this.localstoreage.getData('username') === null) {
      alert("You need to login first");
      console.log("Redirecting to login");
      this.router.navigate(['login']);
      return;
    }
    this.dataservice.setPage('Address')
    this.router.navigate(['/root/shipping'])
    console.log("checkout")
  }
}