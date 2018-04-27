import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SendApiService } from "./core/services/send-api.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LpHeaderComponent } from './lp-header/lp-header.component';
import { LpChatBoxComponent } from './lp-chat-box/lp-chat-box.component';
import { LpTestServicesComponent } from './lp-test-services/lp-test-services.component';
import { LpConversationComponent } from './lp-conversation/lp-conversation.component';
import { LpChatBoxMessageComponent } from './lp-chat-box/lp-chat-box-message/lp-chat-box-message.component';
import { LpChatBoxFooterComponent } from './lp-chat-box/lp-chat-box-footer/lp-chat-box-footer.component';
import { LpConsoleComponent } from './lp-console/lp-console.component';
import { LpHomeComponent } from './lp-home/lp-home.component';
import {AppRoutingModule} from "./app-routing.module";
import { LpNavComponent } from './lp-header/lp-nav/lp-nav.component';
import { LpDemoComponent } from './lp-demo/lp-demo.component';
import { LpNavMenuComponent } from './lp-header/lp-nav-menu/lp-nav-menu.component';
import { LpStartTutotialComponent } from './lp-start-tutorial/lp-start-tutotial.component';
import { AppKeySecretComponent } from './lp-start-tutorial/lp-app-key-secret/lp-app-key-secret.component';
import { WebhooksConfigComponent } from './lp-start-tutorial/lp-webhooks-config/lp-webhooks-config.component';
import { EnableAsycComponent } from './lp-start-tutorial/lp-enable-asyc/lp-enable-asyc.component';
import { AuthenticationService } from './core/services/authentication.service';
import { AccountConfigService } from './core/services/account-config.service';
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";
import { InstallationService } from './core/services/istallation.service';
import { LoadingService } from './core/services/loading.service';
import { HttpService } from './core/services/http.service';
import { LpConfigCheckComponent } from './lp-start-tutorial/lp-config-check/lp-config-check.component';
import { ConversationService } from './core/services/conversation.service';
import { LpConfirmationDialogComponent } from './lp-confirmation-dialog/lp-confirmation-dialog.component';
import { DomainsService } from './core/services/domains.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DomainHeaderInterceptor} from "./core/interceptors/domain-header.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LpHeaderComponent,
    LpChatBoxComponent,
    LpTestServicesComponent,
    LpConversationComponent,
    LpChatBoxMessageComponent,
    LpChatBoxFooterComponent,
    LpConsoleComponent,
    LpHomeComponent,
    LpNavComponent,
    LpDemoComponent,
    LpNavMenuComponent,
    LpStartTutotialComponent,
    AppKeySecretComponent,
    WebhooksConfigComponent,
    EnableAsycComponent,
    LpConfigCheckComponent,
    LpConfirmationDialogComponent
  ],
  imports: [
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
