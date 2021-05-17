import { Component, OnInit } from '@angular/core';
import { SignUpData } from '../../model/SignUpData';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.less']
})
export class SignupFormComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  showLoginForm(){
    this.authService.redirectToLogin();
  }

  signupFormData: SignUpData = {
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    pincode: ""
  }
  doUserSignup(){
    this.authService.signupUser(this.signupFormData).subscribe(res => {
      console.log(res)
    })
  }
}
