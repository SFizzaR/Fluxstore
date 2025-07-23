import { Component } from '@angular/core';
import { LocalstoreageService } from '../../Services/localstoreage.service';
import { Router } from '@angular/router';
import { dataService } from '../../Services/data.service';
import { HttpService } from '../../Services/http.service';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  constructor(
    private localstoreage: LocalstoreageService,
    private router: Router,
    private dataservice: dataService,
    private httpService: HttpService,
    private messageService: MessageService
  ) { }

  products: any[] = []
  page_number: number = 1
  rows: number = 8;
  first: number = 0
  total: number = 0

  ngOnInit(): void {

    this.paginatedOrders();

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
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Added to Cart', life: 3000 });
    }
    else {
      exists.Quantity += 1
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Added to Cart', life: 3000 });
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

  paginatedOrders() {
    this.httpService.getAllProducts({ pagenumber: this.page_number, pagesize: 8 }).subscribe(
      {
        next: (data: any) => {
          this.products = data[1];
          this.total = data[0][0].total;
          console.log('Products fetched successfully:', this.products);
          console.log(this.total)
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      }
    )

  }


  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 8;
    this.page_number = Math.floor(this.first / this.rows) + 1;
    this.paginatedOrders();
  }
}
