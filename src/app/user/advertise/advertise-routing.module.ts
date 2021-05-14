import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertiseDetailComponent } from './advertise-detail/advertise-detail.component';
import { AdvertiseHomeComponent } from './advertise-home/advertise-home.component';

const routes: Routes = [
  {
    path:"home",
    component: AdvertiseHomeComponent
  },
  {
    path:"detail/:advertiseId",
    component: AdvertiseDetailComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertiseRoutingModule { }
