import {NgModule} from '@angular/core';
import {LpHomeComponent} from './lp-home/lp-home.component';
import {MaterialModule} from '../../material.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LpHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class LpHomeModule {
}
