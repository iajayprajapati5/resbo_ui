import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-form.component.html',
  styleUrls: ['./change-pass-form.component.less']
})
export class ChangePassFormComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      this.token = param.get("token") || "";
      if(!this.token){
        this.showLoginForm();
      }else{
        this.validateResetPasswordToken(this.token);
      }
    })
  }

  showLoginForm(){
    this.authService.redirectToLogin();
  }

  newPassword: string = "";
  confirmPassword: string = "";
  token: string = "";
  validateResetPasswordToken(token: string){
    this.authService.validatePasswordResetToken(token).subscribe(res => {

    }, err => {
      this.showLoginForm();
    })
  }

  submitPasswordChange(){
    this.authService.changePasswordUsingToken(this.token, this.newPassword).subscribe((res: any) => {
      this.showLoginForm();
      alert(res.message);
    }, err => {

    })
  }

}
