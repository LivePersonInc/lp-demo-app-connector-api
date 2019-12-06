import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LpDemoComponent} from "./components/lp-demo/lp-demo.component";
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";
import {LogoutGuard} from "./core/guards/logout.guard";
import {LpLoginComponent} from "./components/lp-login/lp-login.component";
import {LpHomeComponent} from "./components/lp-home/lp-home.component";
import {LpAppInstallationsComponent} from "./components/lp-app-installations/lp-app-installations.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LpHomeComponent, canActivate: [AuthGuardGuard]},
  {path: 'login', component: LpLoginComponent},
  {path: 'appinstalls', component: LpAppInstallationsComponent, canActivate: [AuthGuardGuard]},
  {path: 'logout', component: LpLoginComponent, canActivate: [LogoutGuard]},
  {path: 'demo', component: LpDemoComponent, canActivate: [AuthGuardGuard]},
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
