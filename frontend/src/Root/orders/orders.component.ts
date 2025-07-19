import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrackOrderComponent } from '../track-order/track-order.component';
import { HttpService } from '../../Services/http.service';
import { OrderStatuses } from '../../Core/Enums/OrderStatuses';
import { PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogueService: DialogService, private httpService: HttpService) { }
  selectedStatus: string = 'On Shipping'; // default selection
  statuses: string[] = ['On Shipping', 'Delivered', 'Cancelled'];
  orders: any[] = []
  userId: number = 0
  groupedOrders: any[] = []
  filterOrders: any[] = []
  first: number = 0;

  rows: number = 10;
  ngOnInit(): void {
    this.onStatusSelect(this.selectedStatus)
    const order = this.httpService.GetOrders().subscribe({
      next: (data: any) => {
        this.orders = data[0];
        console.log('Orders fetched successfully:', this.orders);
        this.groupOrdersByOrderId(this.orders)
        this.filterOrders = this.filteredOrders()
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
    console.log(order)
  }

  groupOrdersByOrderId(orders: any[]) {
    const orderMap: { [key: number]: any } = {};

    orders.forEach(order => {
      const id = order.orderid;
      if (!orderMap[id]) {
        // Initialize the group
        orderMap[id] = {
          orderid: id,
          Status: order.Status,
          Total: order.Total,
          items: [] // to hold productname, quantity, etc.
        };
      }
      // Push product details into the items array
      orderMap[id].items.push({
        productname: order.productname,
        Quantity: order.Quantity
      });
    });

    // Convert map to array for *ngFor
    this.groupedOrders = Object.values(orderMap);
    console.log("Grouped Orders:", this.groupedOrders);
  }


  checkStatus(status: number): string {
    if (status === OrderStatuses.OrderPlaced || status === OrderStatuses.OrderPacked || status === OrderStatuses.Outfordelivery) {
      return 'On Shipping';
    }
    else if (status === OrderStatuses.Delivered) {
      return 'Delivered'
    }
    else {
      return 'Cancelled'
    }

  }
  onStatusSelect(status: string) {
    this.selectedStatus = status;
    this.filterOrders = this.filteredOrders()
  }

  show(product: any) {
    this.ref = this.dialogueService.open(TrackOrderComponent, {
      header: 'We are processing your data',
      data: { product },
      width: '70vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    )
  }
  filteredOrders() {
    return this.groupedOrders.filter(order => this.checkStatus(order.Status) === this.selectedStatus);
  }

  paginatedOrders() {
    const start = this.first;
    const end = this.first + this.rows;
    return this.filterOrders.slice(start, end);
  }


  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
