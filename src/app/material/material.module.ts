import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const componentList = [
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  imports: [componentList],
  exports: [componentList]
})
export class MaterialModule { }
