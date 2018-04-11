import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LpHomeComponent} from "./lp-home/lp-home.component";
import {LpConversationComponent} from "./lp-conversation/lp-conversation.component";
import {LpTestServicesComponent} from "./lp-test-services/lp-test-services.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LpHomeComponent},
  {path: 'demo', component: LpConversationComponent},
  {path: 'test-services', component: LpTestServicesComponent},
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
