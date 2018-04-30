import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SendApiService } from "./core/services/send-api.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LpTestServicesComponent } from './lp-test-services/lp-test-services.component';
import { LpHomeComponent } from './lp-home/lp-home.component';
import {AppRoutingModule} from "./app-routing.module";
import { LpDemoComponent } from './lp-demo/lp-demo.component';
import { LpStartTutotialComponent } from './lp-start-tutorial/lp-start-tutotial.component';
import { LpAppKeySecretComponent } from './lp-start-tutorial/lp-app-key-secret/lp-app-key-secret.component';
import { LpWebhooksConfigComponent } from './lp-start-tutorial/lp-webhooks-config/lp-webhooks-config.component';
import { LpEnableAsycComponent } from './lp-start-tutorial/lp-enable-asyc/lp-enable-asyc.component';
import { AuthenticationService } from './core/services/authentication.service';
import { AccountConfigService } from './core/services/account-config.service';
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";
import { InstallationService } from './core/services/istallation.service';
import { LoadingService } from './core/services/loading.service';
import { HttpService } from './core/services/http.service';
import { LpConfigCheckComponent } from './lp-start-tutorial/lp-config-check/lp-config-check.component';
import { ConversationService } from './core/services/conversation.service';
import {LpConfirmationDialogComponent} from './lp-confirmation-dialog/lp-confirmation-dialog.component';
import {DomainsService} from './core/services/domains.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DomainHeaderInterceptor} from "./core/interceptors/domain-header.interceptor";
import {LpHeaderModule} from "./lp-header/lp-header.module";
import {LpConversationModule} from "./lp-conversation/lp-conversation.module";

@NgModule({
  declarations: [
    AppComponent,
    LpTestServicesComponent,
    LpHomeComponent,
    LpDemoComponent,
    LpStartTutotialComponent,
    LpAppKeySecretComponent,
    LpWebhooksConfigComponent,
    LpEnableAsycComponent,
    LpConfigCheckComponent,
    LpConfirmationDialogComponent
  ],
  imports: [
    LpHeaderModule,
    LpConversationModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [LpConfirmationDialogComponent],
  providers: [SendApiService, AuthenticationService, AccountConfigService, AuthGuardGuard, InstallationService, LoadingService, HttpService, ConversationService, DomainsService,{
    provide: HTTP_INTERCEPTORS,
    useClass: DomainHeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
