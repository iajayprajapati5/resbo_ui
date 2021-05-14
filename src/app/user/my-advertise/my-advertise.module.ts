import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyAdvertiseRoutingModule } from './my-advertise-routing.module';
import { ListComponent } from './list/list.component';
import { AddNewComponent } from './add-new/add-new.component';
import { EditComponent } from './edit/edit.component';
import { ViewMyAdvertiseComponent } from './view-my-advertise/view-my-advertise.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ListComponent, AddNewComponent, EditComponent, ViewMyAdvertiseComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyAdvertiseRoutingModule,
    TableModule
  ]
})
export class MyAdvertiseModule { }
