import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LpHomeComponent} from "./lp-home/lp-home.component";
import {LpDemoComponent} from "./lp-demo/lp-demo.component";
import {LpStartTutotialComponent} from "./lp-start-tutorial/lp-start-tutotial.component";
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";
import {LogoutGuard} from "./core/guards/logout.guard";

const routes: Routes = [
  {path: '', redirectTo: 'settings', pathMatch: 'full'},
  {path: 'settings', component: LpHomeComponent},
  {path: 'logout', component: LpHomeComponent, canActivate: [LogoutGuard]},
  {path: 'demo', component: LpDemoComponent, canActivate: [AuthGuardGuard]},
  {path: 'settings/start', component: LpStartTutotialComponent,   canActivate: [AuthGuardGuard]}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
