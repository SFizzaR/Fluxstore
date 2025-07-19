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
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.order = this.config.data.product;
  }
  close() {
    this.ref.close();
  }
  public counts = ["Order Placed", "Order Packed", "Out for delivery", "Delivered"];


  public orderStatus = 0
  ngOnInit(): void {
    this.orderStatus = this.order.Status - 1
    console.log(this.orderStatus)

  }
}
