import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SendApiService} from "./core/services/send-api.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LpHomeComponent} from './components/lp-home/lp-home.component';
import {AppRoutingModule} from "./app-routing.module";
import {LpDemoComponent} from './components/lp-demo/lp-demo.component';
import {AuthenticationService} from './core/services/authentication.service';
import {AccountConfigService} from './core/services/account-config.service';
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";
import {InstallationService} from './core/services/istallation.service';
import {LoadingService} from './core/services/loading.service';
import {HttpService} from './core/services/http.service';
import {ConversationService} from './core/services/conversation.service';
import {LpConfirmationDialogComponent} from './components/lp-confirmation-dialog/lp-confirmation-dialog.component';
import {DomainsService} from './core/services/domains.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DomainHeaderInterceptor} from "./core/interceptors/domain-header.interceptor";
import {LpHeaderModule} from "./components/lp-header/lp-header.module";
import {LpConversationModule} from "./components/lp-conversation/lp-conversation.module";
import {LpStartTutorialModule} from "./components/lp-start-tutorial/lp-start-tutorial.module";
import {LogoutGuard} from "./core/guards/logout.guard";
import {ConversationManager} from "./core/helpers/conversation-manager";
import {StateManager} from "./core/helpers/state-manager";
import { LpLoginComponent } from './components/lp-login/lp-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LpHomeComponent,
    LpDemoComponent,
    LpConfirmationDialogComponent,
    LpLoginComponent
  ],
  imports: [
    LpHeaderModule,
    LpConversationModule,
    LpStartTutorialModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [LpConfirmationDialogComponent],
  providers: [
    SendApiService,
    AuthenticationService,
    AccountConfigService,
    AuthGuardGuard,
    LogoutGuard,
    InstallationService,
    LoadingService,
    HttpService,
    ConversationService,
    DomainsService,
    ConversationManager,
    StateManager,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: DomainHeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
