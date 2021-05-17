import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePassFormComponent } from './formComponents/change-pass-form/change-pass-form.component';
import { LoginFormComponent } from './formComponents/login-form/login-form.component';
import { SignupFormComponent } from './formComponents/signup-form/signup-form.component';

const routes: Routes = [
	{ path: 'auth', component: LoginFormComponent },
	{ path: 'signup', component: SignupFormComponent },
	{ path: 'resetPassword', component: ChangePassFormComponent },
	{ path: '', pathMatch: 'full' , redirectTo: 'auth' },
	{ path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
