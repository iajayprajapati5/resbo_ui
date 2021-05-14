import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewMyAdvertiseComponent } from './view-my-advertise/view-my-advertise.component';

const routes: Routes = [
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "add",
    component: AddNewComponent
  },
  {
    path: "edit/:advertiseId",
    component: EditComponent
  },{
    path: "view/:advertiseId",
    component: ViewMyAdvertiseComponent
  },
  {
    path: " ",
    redirectTo: "list"
  },
  {
    path: "**",
    redirectTo: "list"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAdvertiseRoutingModule { }
