import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-track-order',
  standalone: false,
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {
  order: any;
  public counts = ["Order Placed", "Order Packed", "Out for delivery", "Delivered"];
  public orderStatus = 0

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.order = this.config.data.product;
  }

  ngOnInit(): void {
    this.orderStatus = this.order.Status - 1
    console.log(this.orderStatus)

  }

  close() {
    this.ref.close();
  }
}
