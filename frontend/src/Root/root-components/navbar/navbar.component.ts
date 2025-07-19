import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { Router } from '@angular/router';
import { dataService } from '../../../Services/data.service';
import { LocalstoreageService } from '../../../Services/localstoreage.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private dataservice: dataService,
    private localstoreage: LocalstoreageService
  ) { }
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  sidebarVisible: boolean = false;
  username: string = ''

  ngOnInit(): void {
    this.username = this.localstoreage.getData('username')
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  handleCart() {
    this.dataservice.setPage('Cart')
    this.router.navigate(['/root/cart'])
  }

  handleShop() {
    this.router.navigate(['/root/shop'])
    console.log("This is shop")

    this.dataservice.setPage('Shop')
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
