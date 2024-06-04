import {NgModule} from '@angular/core';
import {LpHomeComponent} from './lp-home/lp-home.component';
import {MaterialModule} from '../../material.module';
import {CommonModule} from '@angular/common';
import {LpAppSecretComponent} from './lp-app-secret/lp-app-secret.component';

@NgModule({
  declarations: [
    LpHomeComponent,
    LpAppSecretComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class LpHomeModule {
}
