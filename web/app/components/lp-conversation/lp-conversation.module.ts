import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LpConversationComponent} from "./lp-conversation.component";
import {LpConsoleComponent} from "./lp-console/lp-console.component";
import {LpChatBoxComponent} from "./lp-chat-box/lp-chat-box.component";
import {LpChatBoxFooterComponent} from "./lp-chat-box/lp-chat-box-footer/lp-chat-box-footer.component";
import {LpChatBoxMessageComponent} from "./lp-chat-box/lp-chat-box-message/lp-chat-box-message.component";
import {MaterialModule} from "../../material.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LpConversationFormComponent } from './lp-conversation-form/lp-conversation-form.component';
import {LpRequestsConsoleComponent} from "./lp-requests-console/lp-requests-console.component";
import {LpAdvancedOptionsFormComponent} from "./lp-advanced-options-form/lp-advanced-options-form.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LpConversationComponent,
    LpConsoleComponent,
    LpChatBoxComponent,
    LpChatBoxFooterComponent,
    LpChatBoxMessageComponent,
    LpConversationFormComponent,
    LpAdvancedOptionsFormComponent,
    LpRequestsConsoleComponent
  ],
  exports: [
    LpConversationComponent,
    LpConsoleComponent,
    LpChatBoxComponent,
    LpChatBoxFooterComponent,
    LpChatBoxMessageComponent,
    LpConversationFormComponent,
    LpAdvancedOptionsFormComponent,
    LpRequestsConsoleComponent
  ]
})
export class LpConversationModule { }
