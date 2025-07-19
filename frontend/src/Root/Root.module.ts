import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataService } from '../Services/data.service';
import { RootRoutingModule } from './Root-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './root-components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './root-components/navbar/navbar.component';
import { FooterComponent } from './root-components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuModule } from 'primeng/menu';
import { ShopComponent } from './shop/shop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { CartComponent } from './cart/cart.component';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { DividerModule } from 'primeng/divider';
import { RadioButton } from 'primeng/radiobutton';
import { OrdersComponent } from './orders/orders.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TrackOrderComponent } from './track-order/track-order.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [
        HeaderComponent,
        NavbarComponent,
        FooterComponent,
        RootComponent,
        ShopComponent,
        CartComponent,
        DetailsComponent,
        ShippingComponent,
        OrdersComponent,
        TrackOrderComponent,
    ],
    exports: [

    ],
    imports: [
        CommonModule,
        RootRoutingModule,
        RouterModule,
        MatMenuModule,
        RouterOutlet,
        BrowserModule,
        MatIconModule,
        MenuModule,
        ReactiveFormsModule,
        AvatarModule,
        AvatarGroupModule,
        SidebarModule,
        ButtonModule,
        RippleModule,
        StyleClassModule,
        DataViewModule,
        InputNumberModule,
        FormsModule,
        OverlayBadgeModule,
        DividerModule,
        RadioButton,
        DynamicDialogModule,
        PaginatorModule
    ],
    providers: [
        dataService,
        DialogService,
    ],
})
export class RootModule { }