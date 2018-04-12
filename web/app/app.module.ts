import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SendApiService } from "./services/send-api.service";
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
import { LpStartTutotialComponent } from './lp-start-tutotial/lp-start-tutotial.component';
import { AppKeySecretComponent } from './lp-start-tutotial/app-key-secret/app-key-secret.component';
import { WebhooksConfigComponent } from './lp-start-tutotial/webhooks-config/webhooks-config.component';

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
    WebhooksConfigComponent
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
  providers: [SendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
