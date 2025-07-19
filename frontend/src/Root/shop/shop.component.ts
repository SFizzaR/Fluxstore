import { Component } from '@angular/core';
import { LocalstoreageService } from '../../Services/localstoreage.service';
import { Router } from '@angular/router';
import { dataService } from '../../Services/data.service';
import { HttpService } from '../../Services/http.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  constructor(private localstoreage: LocalstoreageService, private router: Router, private dataservice: dataService, private httpService: HttpService) { }

  products: any[] = []

  ngOnInit(): void {
    this.httpService.getAllProducts().subscribe((x: any) => {
      console.log(x)
      this.products = x
    }, (err: any) => {
      alert('Something Went Wrong, Please Try again after sometime')
      console.log(err)
    })

  }
  toggleCart(product: any) {

    let cart: any[] = [];
    try {
      const storedCart = this.localstoreage.getData('cart');
      if (storedCart.length > 0) {
        cart = storedCart
      }
    } catch (error) {
      console.error('Error parsing cart data:', error);
      cart = [];
    }

    const exists = cart.find((p: any) => p.Id === product.Id);
    if (!exists) {
      product.Quantity = 1
      cart.push(product);
      alert("Added to cart")
    }
    else {
      exists.Quantity += 1
      alert("Added to cart")

    }

    this.localstoreage.saveData('cart', cart);
  }

  ViewDetails(product: any) {
    try {
      const storedData = this.localstoreage.getData('product');
      if (storedData.length > 0) {
        this.localstoreage.removeData('product')
      }
    } catch (error) {
      console.error("Error parsing data", error)
    }
    this.localstoreage.saveData('product', product);
    this.dataservice.setPage('Details')
    this.router.navigate(['/root/details'])
  }
}
