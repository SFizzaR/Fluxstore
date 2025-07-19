import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { dataService } from '../../Services/data.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router, private httpService: HttpService, private dataservice: dataService) { }
  email: string = ''
  username: string = ''
  password: string = ''
  handleSignIn() {
    this.router.navigate(['/'])
  }

  Register() {
    this.httpService.signup({ Email: this.email, Username: this.username, Password: this.password }).subscribe((x: any) => {
      console.log(x)
      alert(x.message)
      if (x.statuscode === 201) {
        this.router.navigateByUrl('login');
      }
    }, (err: any) => {
      alert('Something Went Wrong, Please Try again after sometime')
      console.log(err)
    }
    )
  }
}
