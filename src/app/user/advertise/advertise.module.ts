import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdvertiseRoutingModule } from './advertise-routing.module';
import { AdvertiseHomeComponent } from './advertise-home/advertise-home.component';
import { AdvertiseDetailComponent } from './advertise-detail/advertise-detail.component';


@NgModule({
  declarations: [AdvertiseHomeComponent, AdvertiseDetailComponent],
  imports: [
    CommonModule,
    AdvertiseRoutingModule,
    FormsModule
  ]
})
export class AdvertiseModule { }
