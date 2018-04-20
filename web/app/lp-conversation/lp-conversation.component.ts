import {Component, ComponentRef, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../core/services/send-api.service";
import {Conversation} from "../shared/models/conversation/conversation";
import {EventSourcePolyfill} from 'ng-event-source';
import {LpChatBoxComponent} from "../lp-chat-box/lp-chat-box.component";
import {LoadingService} from "../core/services/loading.service";

@Component({
  selector: 'lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.scss']
})
export class LpConversationComponent implements OnInit {
  public brandId: string;
  public conversationManager: Conversation;
  public isConvStarted: boolean;
  public appKey: string;
  public appSecret: string;
  public eventSource: EventSourcePolyfill;
  public userName: string;

  @ViewChild('chatbox') private chatBox: LpChatBoxComponent;

  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService, private zone: NgZone, private  loadingService: LoadingService) { }

  ngOnInit() {
    this.brandId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;
    this.userName = "test user name";
    this.conversationManager = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret, this.userName, this.loadingService);
  }

  public startConversation(initialMessage: string) {
    this.conversationManager = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret, this.userName, this.loadingService);
    this.conversationManager.getAppJWT().then(resolve => {
      this.conversationManager.getAppConsumerJWS().then(resolve => {
        this.conversationManager.openConversation(initialMessage).then(conversationId => {
          this.isConvStarted = true;
          this.subscribeToMessageNotifications(conversationId);
        });
      });
    });
  }

  public closeConversation() {
    this.conversationManager.closeConversation();
    this.unsubscribeToMessageNotifications();
    this.isConvStarted = false;
  }

  public sendMessage(messageText : string) {
    console.log("Send message");
    if(this.isConvStarted) {


      this.conversationManager.sendMessage(messageText).then(function () {
        console.log("XXXXxXXXXXXXX");
        //this.chatBox.scrollToBottom();
      }.bind(this));
    }else{
      this.startConversation(messageText);
    }
  }

  public subscribeToMessageNotifications(conversationId: string) {
    this.eventSource  = new EventSourcePolyfill(`http://${environment.umsDomain}/notifications/subscribe/${conversationId}`,{});

    this.eventSource.onmessage = (notification => {
      this.conversationManager.handleIncomingNotifications(notification);
      this.zone.run(() => {
        //console.log(notification);
      });
    });

    this.eventSource.onopen = (a) => {
      console.log("OPEN");
    };
    this.eventSource.onerror = (e) => {
      console.log(e);

    }
  }

  public unsubscribeToMessageNotifications() {
    if(this.eventSource instanceof EventSourcePolyfill) {
      this.eventSource.close();
    }else {
      console.log("Error: There is not any instance of EventSourcePolyfill");
    }
  }

}
