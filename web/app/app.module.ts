import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule, MatTooltipModule} from '@angular/material';
import {NgModule} from '@angular/core';
import { MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SendApiService} from './core/services/send-api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LpHomeOldComponent} from './components/lp-home-old/lp-home.component';
import {LpHomeComponent} from './components/lp-home/lp-home.component';
import {AppRoutingModule} from './app-routing.module';
import {LpDemoComponent} from './components/lp-demo/lp-demo.component';
import {AuthenticationService} from './core/services/authentication.service';
import {AccountConfigService} from './core/services/account-config.service';
import {AuthGuardGuard} from './core/guards/auth-guard.guard';
import {InstallationService} from './core/services/installation.service';
import {LoadingService} from './core/services/loading.service';
import {HttpService} from './core/services/http.service';
import {ConversationService} from './core/services/conversation.service';
import {LpConfirmationDialogComponent} from './components/lp-confirmation-dialog/lp-confirmation-dialog.component';
import {DomainsService} from './core/services/domains.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LpHeaderModule} from './components/lp-header/lp-header.module';
import {LpConversationModule} from './components/lp-conversation/lp-conversation.module';
import {LpStartTutorialModule} from './components/lp-start-tutorial/lp-start-tutorial.module';
import {LogoutGuard} from './core/guards/logout.guard';
import {ConversationManager} from './core/util/conversation-manager';
import {StateStorage} from './core/util/state-storage';
import {LpLoginComponent} from './components/lp-login/lp-login.component';
import {LpFooterComponent} from './components/lp-footer/lp-footer.component';
import {HistoryService} from "./core/services/history.service";
import {RequestConsoleInterceptor} from "./core/interceptors/request-console.interceptor";
import {StateRecoveryService} from "./core/services/state-recovery.service";
import {LpAppInstallationsModule} from "./components/lp-app-installations/lp-app-installations.module";

@NgModule({
  declarations: [
    AppComponent,
    LpHomeComponent,
    LpHomeOldComponent,
    LpDemoComponent,
    LpConfirmationDialogComponent,
    LpLoginComponent,
    LpFooterComponent
  ],
  imports: [
    LpAppInstallationsModule,
    LpHeaderModule,
    LpConversationModule,
    LpStartTutorialModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatTooltipModule
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
    StateStorage,
    HistoryService,
    StateRecoveryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestConsoleInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
