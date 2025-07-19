import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../Services/http.service';
import { RouterModule } from '@angular/router';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        RouterModule,
        ToastModule,
        Toast
    ],
    providers: [
        HttpService,
        MessageService
    ],
})
export class AuthModule { }