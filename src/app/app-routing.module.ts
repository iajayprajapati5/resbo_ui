import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthGuard } from './authentication/guard/main-auth.guard';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule),
    data: {
      header: 'Login'
    }
  },
  {
    path: "advertise",
    loadChildren: () => import("./user/advertise/advertise.module").then(m => m.AdvertiseModule),
    canActivate: [MainAuthGuard]
  },
  {
    path: "my-advertise",
    loadChildren: () => import("./user/my-advertise/my-advertise.module").then(m => m.MyAdvertiseModule),
    canActivate: [MainAuthGuard]
  },
  {
    path: "my-interest",
    loadChildren: () => import("./user/my-interest/my-interest.module").then(m => m.MyInterestModule),
    canActivate: [MainAuthGuard]
  },
  {
    path: " ",
    redirectTo: "advertise"
  },
  {
    path: "**",
    redirectTo: "advertise"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
