import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInterestRoutingModule } from './my-interest-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MyInterestRoutingModule
  ]
})
export class MyInterestModule { }
