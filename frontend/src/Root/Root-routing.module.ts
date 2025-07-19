import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
    {
        path: 'cart', component: CartComponent
    },
    {
        path: 'shop', component: ShopComponent
    },

    {
        path: 'details', component: DetailsComponent
    },
    {
        path: 'shipping', component: ShippingComponent
    },
    {
        path: 'orders', component: OrdersComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RootRoutingModule { }