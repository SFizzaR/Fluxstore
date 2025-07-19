import { Component } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { Router } from '@angular/router';
import { dataService } from '../../Services/data.service';
import { LocalstoreageService } from '../../Services/localstoreage.service';

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
    private localstoreage: LocalstoreageService
  ) { }

  emailAddress: string = '';
  password: string = '';

  handleRegister() {
    this.router.navigate(['/signup'])
  }

  logIn() {

    this.httpService.login({ Email: this.emailAddress, Password: this.password }).subscribe((x: any) => {
      console.log(x.token);
      alert(x.message)
      if (x.token) {
        this.localstoreage.saveData('token', x.token)
        this.localstoreage.saveData('username', x.username)
        this.router.navigateByUrl('/root/shop');
      }
    }, (err: any) => {
      alert('Something Went Wrong, Please Try again after sometime...')

      console.log(err)
    });

  }
}
