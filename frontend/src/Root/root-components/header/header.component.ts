import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { dataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import { LocalstoreageService } from '../../../Services/localstoreage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
  constructor(private dataservice: dataService, private router: Router, private localstoreage: LocalstoreageService) { }
  color = "#fff"
  Page = ''
  items = 0;
  private cartSubscription!: Subscription;
  username = ''
  ngOnInit() {
    this.username = this.localstoreage.getData('username')

    this.dataservice.page$.subscribe(page => {
      this.Page = page;
    });
    this.items = this.getItems()
    this.cartSubscription = this.localstoreage.cartChanged$.subscribe(count => {
      this.items = count;
    });

  }

  @Output() toggledChange = new EventEmitter<boolean>();

  isToggled = false;
  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getItems(): number {
    try {
      const cart = this.localstoreage.getData('cart') || [];
      return cart.length;
    } catch (error) {
      console.log('Error fetching cart', error);
      return 0;
    }
  }


  toggle() {
    this.isToggled = !this.isToggled;
    this.toggledChange.emit(this.isToggled);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login'])
  }

  getDataFromChild(e: string) {
    this.Page = e
  }

  handleCart() {
    this.Page = 'Cart'
    this.dataservice.setPage('Cart')
    this.router.navigate(['/root/cart'])
  }

  handleSignUp() {
    this.router.navigate(['signup'])
  }

  handleLogin() {
    this.router.navigate(['login'])
  }
  handleOrderPage() {
    this.router.navigate(['/root/orders'])
    this.dataservice.setPage('Orders')
  }
}
