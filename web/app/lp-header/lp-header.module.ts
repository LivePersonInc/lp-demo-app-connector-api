import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LpNavMenuComponent} from './lp-nav-menu/lp-nav-menu.component';
import {LpNavComponent} from './lp-nav/lp-nav.component';
import {LpHeaderComponent} from "./lp-header.component";
import {MaterialModule} from "../material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LpNavMenuComponent,
    LpNavComponent,
    LpHeaderComponent
  ],
  exports: [
    LpNavMenuComponent,
    LpHeaderComponent,
    LpNavComponent
  ]
})
export class LpHeaderModule { }
