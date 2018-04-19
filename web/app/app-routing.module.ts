import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LpHomeComponent} from "./lp-home/lp-home.component";
import {LpConversationComponent} from "./lp-conversation/lp-conversation.component";
import {LpTestServicesComponent} from "./lp-test-services/lp-test-services.component";
import {LpDemoComponent} from "./lp-demo/lp-demo.component";
import {LpStartTutotialComponent} from "./lp-start-tutorial/lp-start-tutotial.component";
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LpHomeComponent},
  {path: 'demo', component: LpDemoComponent},
  {path: 'home/start', component: LpStartTutotialComponent,   canActivate: [AuthGuardGuard]}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
