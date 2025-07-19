import { Component } from '@angular/core';
import { LocalstoreageService } from '../../Services/localstoreage.service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  constructor(private localstoreage: LocalstoreageService) { }
  product: any

  ngOnInit(): void {
    this.product = this.localstoreage.getData('product')
    this.product.Quantity = this.getQuantity(this.product)

  }
  getQuantity(item: any): number {
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
    const exists = cart.find((p: any) => p.Id === item.Id);
    if (!exists) {
      return 0;
    }
    else {
      return exists.Quantity
    }

  }
  updateQuantity(item: any) {
    this.product.Quantity = item.Quantity
  }

  addToCart(item: any) {
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

    const exists = cart.find((p: any) => p.Id === item.Id);
    if (this.product.Quantity === item.Quantity) {
      this.product.Quantity += 1
    }
    if (!exists) {
      item.Quantity = this.product.Quantity
      cart.push(item);
      alert("Added to cart")
    }
    else {
      exists.Quantity = this.product.Quantity
      alert("Added to cart")

    }

    this.localstoreage.saveData('cart', cart);
  }
}
