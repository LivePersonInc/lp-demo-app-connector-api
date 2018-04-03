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
@NgModule({
  declarations: [
    AppComponent,
    LpHeaderComponent,
    LpChatBoxComponent,
    LpTestServicesComponent,
    LpConversationComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
