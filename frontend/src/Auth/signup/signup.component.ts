import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { dataService } from '../../Services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private router: Router,
    private httpService: HttpService,
    private messageService: MessageService) { }
  email: string = ''
  username: string = ''
  password: string = ''
  handleSignIn() {
    this.router.navigate(['/'])
  }

  Register() {
    this.httpService.signup({ Email: this.email, Username: this.username, Password: this.password }).subscribe((x: any) => {

      if (x.statuscode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: x.message, life: 3000 });
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 400);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'error', detail: x.message, life: 3000 });

      }
    }, (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something Went Wrong, Please Try again after sometime', life: 3000 });

      console.log(err)
    }
    )
  }
}
