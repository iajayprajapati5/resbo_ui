import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  userName: string = "";
  password: string = "";

  doLoginUser(){
    this.authService.loginUser(this.userName, this.password).subscribe(
      res => {
        this.authService.loggedInUser = res;
        this.router.navigateByUrl("advertise/home");
      }
    )
  }

  showSignupForm(){
    this.authService.loginScreenPage.next("sign-up");
  }
}
