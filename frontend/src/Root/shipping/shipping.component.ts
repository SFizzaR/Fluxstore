import { Component } from '@angular/core';
import { LocalstoreageService } from '../../Services/localstoreage.service';
import { Router } from '@angular/router';
import { dataService } from '../../Services/data.service';
import { HttpService } from '../../Services/http.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shipping',
  standalone: false,
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent {
  constructor(
    private localstoreage: LocalstoreageService,
    private router: Router,
    private dataservice: dataService,
    private httpSerivce: HttpService,
    private messageService: MessageService
  ) { }

  size: any = false;
  items = 0
  total = 0
  products: any[] = []
  isSubmit = false
  countries = ['United States', 'Canada', 'United Kingdom', 'Pakistan', 'Australia'];
  states = {
    'United States': ['New York', 'California', 'Texas'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia'],
    'United Kingdom': ['England', 'Scotland', 'Wales'],
    'Pakistan': ['Punjab', 'Sindh', 'KPK'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland']
  };
  shippingAddress = {
    FirstName: '',
    LastName: '',
    Address: '',
    Address2: '',
    Country: '',
    City: '',
    State: '',
    Zip: '',
    PhoneNumber: '',
  }
  paymentDetails = {
    CardNumber: '',
    HolderName: ''
  }
  availableStates: string[] = [];
  selectedAddress: any = null;
  storedAddresses: any[] = []
  showForm = false
  showPayment = false

  ngOnInit(): void {
    this.products = this.localstoreage.getData('cart') || []
    this.items = this.getItems()
    this.total = this.dataservice.getTotal()
    console.log(this.total)
    this.httpSerivce.GetAddress().subscribe((x: any) => {
      console.log(x)
      this.storedAddresses = x
    }, (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something Went Wrong, Please Try again after sometime', life: 3000 });
      console.log(err)
    }
    )
  }

  onCountryChange() {
    this.availableStates = this.states[this.shippingAddress.Country as keyof typeof this.states] || [];
  }

  getItems(): number {
    return this.products.length
  }

  placeOrder = (cardId: number) => {
    this.httpSerivce.AddAddress(this.shippingAddress).subscribe({
      next: (addressRes: any) => {
        console.log(addressRes);
        if (addressRes.statuscode === 201 && addressRes.Id) {
          this.httpSerivce.AddOrder({ Total: this.total, AddressId: addressRes.Id, PaymentMethod: this.size, CardId: cardId }).subscribe({
            next: (orderRes: any) => {

              console.log(orderRes);
              if (orderRes.statuscode === 201 && orderRes.Id) {
                const requests = this.products.map(product => {
                  return this.httpSerivce.AddItems({
                    OrderId: orderRes.Id,
                    ProductId: product.Id,
                    Quantity: product.Quantity
                  }).toPromise();
                });

                Promise.all(requests)
                  .then(() => {
                    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your order has been placed successfully!', life: 3000 });
                    this.localstoreage.saveData('cart', []);
                    this.dataservice.setPage('Orders')
                    setTimeout(() => {
                      this.router.navigate(['root/orders']);
                    }, 400);
                  })
                  .catch(err => {
                    console.error(err);
                    this.messageService.add({ severity: 'error', summary: 'error', detail: 'Error adding products to order. Please try again.', life: 3000 });
                  });
              } else {
                this.messageService.add({ severity: 'error', summary: 'error', detail: orderRes.message || "Unexpected error while placing order.", life: 3000 });
              }
            },
            error: (err: any) => {
              console.error(err);
              this.messageService.add({ severity: 'error', summary: 'error', detail: "Something went wrong. Please try again later.", life: 3000 });
            }
          });
        }
      }, error: (err: any) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'error', detail: "Something went wrong. Please try again later.", life: 3000 });
      }
    })
  }

  OnSubmit() {
    if (this.selectedAddress !== null) {
      this.shippingAddress = this.selectedAddress
    }
    if (
      !this.shippingAddress.FirstName || !this.shippingAddress.LastName || !this.shippingAddress.Address ||
      !this.shippingAddress.Country || !this.shippingAddress.City || !this.shippingAddress.State ||
      !this.shippingAddress.PhoneNumber
    ) {
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: "Required fields are missing", life: 3000 });
      return;
    }
    if (!this.size) {
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: "Select a payment method", life: 3000 });
      return;
    }
    if (this.size === "2") {
      if (!this.paymentDetails.CardNumber || !this.paymentDetails.HolderName) {
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: "Payment details are missing", life: 3000 });
        return;
      }
    }
    if (this.shippingAddress.PhoneNumber.length !== 11) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: "Phone number format not valid", life: 3000 });
      return;
    }
    if (this.size === "2") {
      const fullCardNumber = this.paymentDetails.CardNumber.replace(/\s+/g, ''); // remove spaces
      const last4Digits = fullCardNumber.slice(-4);
      this.httpSerivce.AddCard({ HolderName: this.paymentDetails.HolderName, CardNumberLast4: last4Digits }).subscribe((x: any) => {
        if (x.statuscode === 201 && x.Id) {
          console.log(x.Id)
          this.placeOrder(x.Id)
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'error', detail: "Error saving card details", life: 3000 });
        }
      })
    }
    else {
      this.placeOrder(0)
    }
  }

  handleShipping() {
    if (this.selectedAddress === null) {
      this.showForm = true
      this.showPayment = true
    } else if (this.selectedAddress) {
      this.showPayment = true
    } else {
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: "Please select an address or add a new one.", life: 3000 });
    }
  }

  toggle() {
    this.showPayment = false
    this.showForm = false
  }

}