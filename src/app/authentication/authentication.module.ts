import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLoginComponent } from './main-login/main-login.component';
import { LoginFormComponent } from './formComponents/login-form/login-form.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupFormComponent } from './formComponents/signup-form/signup-form.component';
import { ChangePassFormComponent } from './formComponents/change-pass-form/change-pass-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainLoginComponent,
    LoginFormComponent,
    SignupFormComponent,
    ChangePassFormComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
