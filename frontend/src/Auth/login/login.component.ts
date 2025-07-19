import { Component } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { Router } from '@angular/router';
import { dataService } from '../../Services/data.service';
import { LocalstoreageService } from '../../Services/localstoreage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private httpService: HttpService,
    private localstoreage: LocalstoreageService,
    private messageservice: MessageService
  ) { }

  emailAddress: string = '';
  password: string = '';

  handleRegister() {
    this.router.navigate(['/signup'])
  }

  logIn() {
    this.httpService.login({ Email: this.emailAddress, Password: this.password }).subscribe((x: any) => {
      if (x.token) {
        this.messageservice.add({ severity: 'success', summary: 'success', detail: x.message, life: 3000 });

        this.localstoreage.saveData('token', x.token)
        this.localstoreage.saveData('username', x.username)
        setTimeout(() => {
          this.router.navigate(['/root/shop']);
        }, 400);
      }
      else {
        this.messageservice.add({ severity: 'error', summary: 'error', detail: x.message, life: 3000 });
      }
    }, (err: any) => {
      this.messageservice.add({ severity: 'error', summary: 'error', detail: 'Something Went Wrong, Please Try again after sometime...', life: 3000 });
      console.log(err)
    });
  }
}
