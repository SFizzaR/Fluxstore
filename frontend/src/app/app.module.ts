import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '../Auth/auth.module';
import { RootModule } from '../Root/Root.module';
import { HttpService } from '../Services/http.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { TokenInterceptor } from '../interceptors/token.interceptors';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RootModule,
    FormsModule,
    RouterOutlet,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
