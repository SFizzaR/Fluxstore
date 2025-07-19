import { Component } from '@angular/core';
import { LocalstoreageService } from '../../Services/localstoreage.service';
import { Router } from '@angular/router';
import { dataService } from '../../Services/data.service';
import { HttpService } from '../../Services/http.service';

@Component({
  selector: 'app-shipping',
  standalone: false,
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent {
  size: any = false;
  constructor(private localstoreage: LocalstoreageService, private router: Router, private dataservice: dataService, private httpSerivce: HttpService) { }
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
      alert('Something Went Wrong, Please Try again after sometime')
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
                    alert("Your order has been placed successfully!");
                    this.localstoreage.saveData('cart', []);
                    this.dataservice.setPage('Orders')
                    this.router.navigate(['/root/orders']);
                  })
                  .catch(err => {
                    console.error(err);
                    alert("Error adding products to order. Please try again.");
                  });
              } else {
                alert(orderRes.message || "Unexpected error while placing order.");
              }
            },
            error: (err: any) => {
              console.error(err);
              alert("Something went wrong. Please try again later.");
            }
          });
        }
      }, error: (err: any) => {
        console.error(err);
        alert("Something went wrong. Please try again later.");
      }
    })
  }
  OnSubmit() {
    console.log(this.size);

    if (this.selectedAddress !== null) {
      this.shippingAddress = this.selectedAddress
    }
    if (
      !this.shippingAddress.FirstName || !this.shippingAddress.LastName || !this.shippingAddress.Address ||
      !this.shippingAddress.Country || !this.shippingAddress.City || !this.shippingAddress.State ||
      !this.shippingAddress.PhoneNumber
    ) {
      alert("Required fields are missing");
      return;
    }


    if (!this.size) {
      alert("Select a payment method");
      return;
    }

    if (this.size === "2") {
      if (!this.paymentDetails.CardNumber || !this.paymentDetails.HolderName) {
        alert("Payment details are missing");
        return;
      }
    }

    if (this.shippingAddress.PhoneNumber.length !== 11) {
      alert("Phone number format not valid");
      return;
    }
    if (this.size === "2") {
      const fullCardNumber = this.paymentDetails.CardNumber.replace(/\s+/g, ''); // remove spaces
      const last4Digits = fullCardNumber.slice(-4);
      console.log(last4Digits)
      this.httpSerivce.AddCard({ HolderName: this.paymentDetails.HolderName, CardNumberLast4: last4Digits }).subscribe((x: any) => {
        if (x.statuscode === 201 && x.Id) {
          console.log(x.Id)
          this.placeOrder(x.Id)
        }
        else {
          alert("Error saving card details")
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
      console.log('Selected Address:', this.selectedAddress);
      this.showPayment = true
    } else {
      alert("Please select an address or add a new one.");
    }
  }

  toggle() {
    this.showPayment = false
    this.showForm = false
  }

}