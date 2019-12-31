import {Injectable} from '@angular/core';
import {SendApiService} from '../services/send-api.service';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Conversation} from '../../shared/models/conversation/conversation.model';
import {EventSourcePolyfill} from 'ng-event-source';
import {ChatMessage, MessageType} from '../../shared/models/conversation/chatMessage.model';
import {CampaignInfo} from '../../shared/models/send-api/CampaignInfo.model';
import {ConsumerRequestConversation} from '../../shared/models/send-api/ConsumerRequestConversation.model';
import {PushNotificationData} from '../../shared/models/send-api/PushNotificationData.model';
import {PrivateData} from '../../shared/models/send-api/PrivateData.model';
import {SetUserProfile} from '../../shared/models/send-api/SetUserProfile.model';
import {Request} from '../../shared/models/send-api/Request.model';
import {Event} from '../../shared/models/send-api/Event.model';
import {PublishContentEvent} from '../../shared/models/send-api/PublishContentEvent.model';
import {StateStorage} from './state-storage';
import {ChatState, EventChatState} from '../../shared/models/send-api/EventChatState.model';
import {ConversationEvent, ConvEvent} from '../../shared/models/conversation/conversationEvent.model';
import {EventAcceptStatus, Status} from '../../shared/models/send-api/EventAcceptStatus.model';
import {HistoryService} from '../services/history.service';
import {AppState} from '../../shared/models/stored-state/AppState';
import {ConversationContext} from '../../shared/models/send-api/ConversationContext.model';
import {FileMessage} from '../../shared/models/conversation/fileMessage.model';
import {UpdateConversationField} from 'web/app/shared/models/send-api/UpdateConversationField.model';
import {DialogState} from 'web/app/shared/models/send-api/DialogState.model';
import {DialogChange} from 'web/app/shared/models/send-api/DialogChange.model';


@Injectable()
export class ConversationManager {
  
  public conversationEventSubject = new Subject<ConversationEvent>();
  
  constructor(private sendApiService: SendApiService,
              protected stateManager: StateStorage,
              protected historyService: HistoryService) {
  }
  
  public openConversation(conversation: Conversation): Observable<any> {
    conversation.isPostSurveyStarted = false;
    
    return this.authenticate(conversation).pipe(flatMap((res: any) => {
      return this.openConversationRequest(conversation).pipe(map((res: any) => {
        conversation.conversationId = res['convId'];
        // Seb - New conversation dialogId is same as conversationId
        conversation.dialogId = res['convId'];
        conversation.isConvStarted = true;
        this.subscribeToMessageNotifications(conversation);
      }));
    }))
  }
  
  public authenticate(conversation: Conversation): Observable<any> {
    return this.getAppJWT(conversation).pipe(
      flatMap((res: any) => {
        conversation.appJWT = res['access_token'];
        return this.getConsumerJWS(conversation).pipe(
          map((res: any) => {
            conversation.consumerJWS = res['token'];
          }))
      }));
  }
  
  public sendMessage(message: string, conversation: Conversation): Observable<any> {
    return this.sendMessageRequest(message, conversation).pipe(map(res => {
      let sequence;
      if (res && res.body && res.body.hasOwnProperty('sequence')) {
        sequence = res.body.sequence;
      }
      conversation.messages.push(new ChatMessage(MessageType.SENT, new Date, message, conversation.userName, true, sequence, false));
      
      this.updateState(conversation);
    }));
  }
  
  public sendMessageWithImage(file: any, type: string, relativePath: string,
                              message: string, fileName: string, conversation: Conversation): Observable<any> {
    return this.getPreviewImage(file).pipe(flatMap(preview => {
      return this.sendMessageWithUploadedFileRequest(message, relativePath, type, preview, conversation).pipe(map(res => {
        let sequence;
        if (res && res.body && res.body.hasOwnProperty('sequence')) {
          sequence = res.body.sequence;
        }
        const msg = new ChatMessage(MessageType.SENT, new Date, message, conversation.userName, true, sequence, false);
        msg.file = new FileMessage(fileName, preview, relativePath);
        conversation.messages.push(msg);
        
        this.updateState(conversation);
      }));
    }));
  }
  
  public closeConversation(conversation: Conversation): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    // TODO: should be done with sendRaw endopoin (sendMessage) wiht the right payload
    return this.sendApiService.closeConversation(conversation.branId, conversation.conversationId, headers).pipe(
      map(res => {
        this.unSubscribeToMessageNotifications(conversation); //TODO: this line should be removed for PCS
        conversation.isConvStarted = false;
        this.updateState(conversation);
      }));
    
  }
  
  // TODO: Seb - Close conversation with the PCS payload added...
  public closeConversationWithPCS(conversation: Conversation): Observable<any> {
    conversation.isPostSurveyStarted = true;
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getCloseConversationWithPCSBody(conversation));
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  
  // TODO: Seb - get close conversation body with PCS. Body might need the creation of new field+type+dialog and dialogId+state model
  private getCloseConversationWithPCSBody(conversation: Conversation): Request {
    const dialogState = new DialogState(conversation.dialogId, 'CLOSE', 'Closed by consumer');
    const dialogChange = new DialogChange('DialogChange', 'UPDATE', dialogState);
    const body = new UpdateConversationField(conversation.conversationId, dialogChange);
    
    return new Request('req', '2', 'cm.UpdateConversationField', body);
  }
  
  public subscribeToMessageNotifications(conversation: Conversation) {
    conversation.eventSource = new EventSourcePolyfill(`${environment.protocol}://${environment.server}:${environment.port}/subscribe/notifications/${conversation.conversationId}/${conversation.appKey}`, {withCredentials: environment.production});
    
    conversation.eventSource.onmessage = (notification => {
      this.handleIncomingNotifications(notification, conversation);
    });
    conversation.eventSource.onopen = (a) => {
      console.log('OPEN');
    };
    conversation.eventSource.onerror = (e) => {
      console.log(e);
    };
  }
  
  public unSubscribeToMessageNotifications(conversation: Conversation) {
    if (conversation.eventSource instanceof EventSourcePolyfill) {
      conversation.eventSource.close();
    } else {
      console.log('Error: There is not any instance of EventSourcePolyfill');
    }
  }
  
  private getAppJWT(conversation: Conversation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.sendApiService.getAppJWT(conversation.branId, conversation.appKey, conversation.appSecret, httpOptions);
  }
  
  private getConsumerJWS(conversation: Conversation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: conversation.appJWT
      })
    };
    const body = {ext_consumer_id: conversation.ext_consumer_id};
    return this.sendApiService.getConsumerJWS(conversation.branId, body, httpOptions);
  }
  
  private sendMessageRequest(message: string, conversation: Conversation): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getMessageRequestBody(message, conversation.dialogId, conversation.conversationId));
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  private openConversationRequest(conversation: Conversation): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getOpenConvRequestBody(conversation));
    return this.sendApiService.openConversation(conversation.branId, body, headers);
  }
  
  public sendChatStateEventRequest(conversation: Conversation, event: ChatState): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getChatStateRequestBody(conversation, event));
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  public sendEventAcceptStatusRequest(conversation: Conversation, event: Status, sequenceList: Array<number>): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getEventAcceptStatusRequestBody(conversation, event, sequenceList));
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  public sendUploadUrlRequest(fileSize: string, fileType: string, conversation: Conversation): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getUploadURLRequestBody(fileSize, fileType));
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  public getDownloadUrl(relativePath: string, conversation: Conversation): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const body = JSON.stringify(this.getDownloadURLRequestBody(relativePath));
    
    if (!conversation.isConvStarted) {
      console.log('No authenticated');
      return this.authenticate(conversation).pipe(
        flatMap(r => {
          return this.sendApiService.sendMessage(conversation.branId, body, headers);
        })
      );
    }
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  public uploadFileRequest(file: any, relativePath: string, tempUrlSig: string, tempUrlExpires: string): Observable<any> {
    return this.sendApiService.uploadFile(relativePath, tempUrlSig, tempUrlExpires, file);
  }
  
  public sendMessageWithUploadedFileRequest(caption: string, relativePath: string, fileType: string, preview: any, conversation: Conversation): Observable<any> {
    const headers = this.addSendRawEndpointHeaders(conversation.appJWT, conversation.consumerJWS, conversation.features);
    const message = {'caption': caption, 'relativePath': relativePath, 'fileType': fileType, 'preview': preview};
    const body = JSON.stringify(this.getMessageWithFileRequestBody(message, conversation.dialogId, conversation.conversationId));
    return this.sendApiService.sendMessage(conversation.branId, body, headers);
  }
  
  private addSendRawEndpointHeaders(appJWT, consumerJWS, features): any {
    return {
      'headers': {
        'content-type': 'application/json',
        'Authorization': appJWT,
        'x-lp-on-behalf': consumerJWS,
        'Client-Properties': JSON.stringify({'type': '.ClientProperties', 'features': features})
      }
    };
  }
  
  private handleIncomingNotifications(notification: any, conversation: Conversation) {
    
    this.conversationEventSubject.next(new ConversationEvent(conversation.conversationId, ConvEvent.EVENT_RECEIVED));
    
    let data = JSON.parse(notification.data);
    
    this.setChatState(data, conversation);
    
    conversation.serverNotifications.push(data);
    
    this.checkAndFilterIncomingTextMessages(data, conversation);
    
    this.checkAndFilterIncomingRichContextMessages(data, conversation);
    
    this.checkIfMessageIsAcceptedOrRead(data, conversation);
    
    this.checkIfSurveyOpen(data, conversation);
    
    this.checkIfConversationWasClosed(data, conversation);
    this.checkConsumerGeneratedId(data, conversation);
    
    this.updateState(conversation);
  }
  
  private checkAndFilterIncomingTextMessages(data: any, conversation: Conversation) {
    try {
      if (data.body.changes[0].originatorMetadata &&
        data.body.changes[0].originatorMetadata.role != 'CONSUMER') {
        
        if (data.body.changes[0].event.message) {
          
          conversation.messages.push(
            new ChatMessage(
              MessageType.RECEIVED,
              data.body.changes[0].serverTimestamp,
              data.body.changes[0].event.message,
              data.body.changes[0].originatorMetadata.role,
              true, // this.getShowUserValue("Agent", conversation)
              data.body.changes[0].sequence,
              false
            )
          );
          
          this.conversationEventSubject.next(new ConversationEvent(conversation.conversationId, ConvEvent.MSG_RECEIVED));
          
        }
      }
    } catch (error) {
      console.error('ERROR parsing notification', error);
    }
  }
  
  private checkAndFilterIncomingRichContextMessages(data: any, conversation: Conversation) {
    try {
      if (data.body.changes[0].originatorMetadata &&
        data.body.changes[0].originatorMetadata.role != 'CONSUMER') {
        
        if (data.body.changes[0].event.type && data.body.changes[0].event.type === 'RichContentEvent') {
          
          conversation.messages.push(
            new ChatMessage(
              MessageType.RECEIVED,
              data.body.changes[0].serverTimestamp,
              data.body.changes[0].event,
              data.body.changes[0].originatorMetadata.role,
              true, // this.getShowUserValue("Agent", conversation)
              data.body.changes[0].sequence,
              true
            )
          );
          
          this.conversationEventSubject.next(new ConversationEvent(conversation.conversationId, ConvEvent.MSG_RECEIVED));
          
        }
      }
    } catch (error) {
      console.error('ERROR parsing notification', error);
    }
  }
  
  private checkIfMessageIsAcceptedOrRead(data: any, conversation: Conversation) {
    try {
      if (data.body.changes[0].originatorMetadata &&
        data.body.changes[0].originatorMetadata.role != 'CONSUMER') {
        
        if (data.body.changes[0].event.type === 'AcceptStatusEvent') {
          if (data.body.changes[0].event.status === 'ACCEPT') {
            data.body.changes[0].event.sequenceList.forEach(number => {
              let message = this.findMessageInConversationBySequence(number, conversation);
              if (message) {
                message.accepted = true;
              }
            });
          }
          if (data.body.changes[0].event.status === 'READ') {
            data.body.changes[0].event.sequenceList.forEach(number => {
              let message = this.findMessageInConversationBySequence(number, conversation);
              if (message) {
                message.accepted = true;
                message.read = true;
              }
            });
          }
          
        }
      }
    } catch (error) {
      console.error('ERROR parsing notification', error);
    }
  }
  
  private checkIfConversationWasClosed(data: any, conversation: Conversation) {
    try {
      if (data.body.changes[0].result && data.body.changes[0].result.conversationDetails
        && data.body.changes[0].result.conversationDetails.state === 'CLOSE'
        && data.body.changes[0].result.conversationDetails.stage === 'CLOSE'
      ) {
        this.unSubscribeToMessageNotifications(conversation);
        conversation.isConvStarted = false;
        conversation.dialogId = conversation.conversationId;
        conversation.isPostSurveyStarted = false;
        this.updateState(conversation);
      }
    } catch (error) {
      console.error('ERROR parsing notification', error);
    }
  }
  
  private checkIfSurveyOpen(data: any, conversation: Conversation) {
    try {
      if (data.body.changes[0].result && data.body.changes[0].result.conversationDetails) {
        const conversationDetails = data.body.changes[0].result.conversationDetails;
        if (conversationDetails.dialogs
          && conversationDetails.dialogs[1]
          && conversationDetails.dialogs[1].dialogType === 'POST_SURVEY'
        ) {
          const postSurveyDialogId = conversationDetails.dialogs[1].dialogId;
          conversation.dialogId = postSurveyDialogId;
          conversation.isPostSurveyStarted = true;
        }
      }
    } catch (error) {
      console.error('ERROR retrieving post survey', error);
    }
  }
  
  private checkConsumerGeneratedId(data: any, conversation: Conversation) {
    try {
      if (!conversation.consumerId && data.body.changes[0].originatorMetadata
        && data.body.changes[0].originatorMetadata.role === 'CONSUMER') {
        
        conversation.consumerId = data.body.changes[0].originatorMetadata.id;
        
      }
      
    } catch (error) {
      console.error('ERROR parsing notification', error);
    }
  }
  
  private findMessageInConversationBySequence(sequence: number, conversation: Conversation): ChatMessage {
    let res = null;
    conversation.messages.forEach(m => {
      if (m.sequence === sequence) {
        res = m;
      }
    });
    return res;
  }
  
  private getShowUserValue(userName: string, conversation: Conversation): boolean {
    return conversation.messages && (conversation.messages.length === 0 || conversation.messages[conversation.messages.length - 1].userName !== userName);
  }
  
  private getMessageRequestBody(message: string, dialogId: string, conversationId: string): Request {
    let body = new PublishContentEvent(dialogId, conversationId, new Event('ContentEvent', 'text/plain', message));
    return new Request('req', '3', 'ms.PublishEvent', body);
  }
  
  private getMessageWithFileRequestBody(message: Object, dialogId: string, conversationId: string): Request {
    return new Request('req', '3', 'ms.PublishEvent', new PublishContentEvent(dialogId, conversationId,
      new Event('ContentEvent', 'hosted/file', message)));
  }
  
  private getUploadURLRequestBody(fileSize: string, fileType: string): Request {
    const body = {'fileSize': '' + fileSize + '', 'fileType': 'PNG'};
    return new Request('req', '3', 'ms.GenerateURLForUploadFile', body);
  }
  
  private getDownloadURLRequestBody(relativePath: string): Request {
    const body = {'relativePath': '' + relativePath + ''};
    
    return new Request('req', '3', 'ms.GenerateURLForDownloadFile', body);
  }
  
  private getOpenConvRequestBody(conversation: Conversation): any {
    let campaignInfo = new CampaignInfo(conversation.campaignId, conversation.engagementId);
    let conversationContext = new ConversationContext(conversation.context_name, conversation.features);
    let requestBody = new ConsumerRequestConversation(
      'CUSTOM',
      campaignInfo,
      'MESSAGING',
      conversation.branId,
      conversation.skillId,
      conversationContext
    );
    let requestConversationPayload = new Request('req', '1,', 'cm.ConsumerRequestConversation', requestBody);
    
    let pushNotificationData = new PushNotificationData('Service', 'CertName', 'TOKEN');
    let privateData = new PrivateData('1750345346', 'test@email.com', pushNotificationData);
    let setUserProfileBody = new SetUserProfile(
      conversation.userName || 'WEB UI USER',
      '',
      'http://avatarurl.com',
      'consumer',
      'http://something.com',
      'Test Description',
      privateData
    );
    let setUserProfilePayload = new Request('req', '2,', 'userprofile.SetUserProfile', setUserProfileBody);
    
    return [setUserProfilePayload, requestConversationPayload];
  }
  
  // After some investigation, post survey does not accept any event states. The api should not be called when survey is triggered.
  private getChatStateRequestBody(conversation: Conversation, event: ChatState): any {
    let eventChatState = new EventChatState(event);
    let requestBody = new PublishContentEvent(conversation.dialogId, conversation.conversationId, eventChatState);
    return new Request('req', '1,', 'ms.PublishEvent', requestBody);
  }
  
  private getEventAcceptStatusRequestBody(conversation: Conversation, event: Status, sequenceList: Array<number>): any {
    let eventAcceptStatus = new EventAcceptStatus(event, sequenceList);
    
    let requestBody = new PublishContentEvent(conversation.dialogId, conversation.conversationId, eventAcceptStatus);
    
    return new Request('req', '1,', 'ms.PublishEvent', requestBody);
  }
  
  private updateState(conversation: Conversation) {
    let state = this.stateManager.getLastStoredStateByBrand(conversation.branId);
    
    state.selectedAppId = conversation.appKey;
    
    let appState = this.fidAppById(state.states, conversation.appKey);
    
    if (!appState) {
      appState = new AppState();
      state.states.push(appState);
    }
    
    appState.conversationId = conversation.conversationId;
    appState.appId = conversation.appKey;
    appState.ext_consumer_id = conversation.ext_consumer_id;
    appState.userName = conversation.userName;
    appState.features = conversation.features;
    appState.skillId = conversation.skillId;
    appState.campaignId = conversation.campaignId;
    appState.engagementId = conversation.engagementId;
    
    this.stateManager.storeLastStateInLocalStorage(state, conversation.branId);
  }
  
  public fidAppById(states: Array<AppState>, appId: string): AppState {
    if (states && states.length) {
      for (let i = 0; i < states.length; i++) {
        if (states[i].appId === appId) {
          return states[i];
        }
      }
    }
    return null;
  }
  
  private setChatState(notificationJson: any, conversation: Conversation) {
    if (this.checkIfAcceptStatusEvent(notificationJson)) {
      if (notificationJson.body.changes[0].originatorMetadata &&
        notificationJson.body.changes[0].originatorMetadata.role !== 'CONSUMER') {
        if (notificationJson.body.changes[0].event.chatState === 'COMPOSING') {
          conversation.chatState = ChatState.COMPOSING;
        } else if (notificationJson.body.changes[0].event.chatState === 'ACTIVE') {
          conversation.chatState = ChatState.ACTIVE;
        }
      }
    }
  }
  
  private checkIfHasChatStateEventProperty(notification: any) {
    return notification.type === 'ms.MessagingEventNotification' && notification.body && notification.body.changes.length > 0
      && (notification.body.changes[0].event && notification.body.changes[0].event.type && notification.body.changes[0].event.chatState);
  }
  
  
  private checkIfAcceptStatusEvent(notification: any) {
    return this.checkIfHasChatStateEventProperty(notification) && notification.body.changes[0].event.type === 'ChatStateEvent';
  }
  
  public addHistoryMessageToCurrentState(conversation: Conversation) {
    if (this.historyService.history && this.historyService.history.conversationHistoryRecords[0]
      && this.historyService.history.conversationHistoryRecords[0].messageRecords) {
      
      if (this.checkIfConversationWasClosedInHistroy(this.historyService.history.conversationHistoryRecords[0])) {
        conversation.isConvStarted = false;
      } else {
        conversation.isConvStarted = true;
      }
      
      this.historyService.history.conversationHistoryRecords[0].messageRecords.forEach(record => {
        let messageType = MessageType.RECEIVED;
        let userName = record.sentBy;
        
        if (record.sentBy == 'Consumer') {
          messageType = MessageType.SENT;
          userName = conversation.userName;
        }
        
        let message = new ChatMessage(messageType, record.timeL, '[ERROR] problem with record type!!', userName, true, record.seq, false);
        
        switch (record.type) {
          case 'TEXT_PLAIN':
            message = new ChatMessage(messageType, record.timeL, record.messageData.msg.text, userName, true, record.seq, false);
            break;
          case  'HOSTED_FILE':
            message = new ChatMessage(messageType, record.timeL, record.messageData.file.caption, userName, true, record.seq, false);
            message.file =
              new FileMessage(record.messageData.file.caption, record.messageData.file.preview, record.messageData.file.relativePath);
            break;
          case 'RICH_CONTENT':
            if (record.messageData.richContent && record.messageData.richContent.content) {
              try {
                message = new ChatMessage(messageType, record.timeL, record.messageData.richContent, userName, true, record.seq, true);
              } catch (error) {
                console.error('ERROR parsing rich content from history: ', error);
              }
            }
            break;
        }
        
        conversation.messages.push(message);
      });
      
      this.updateMessagesStatus(this.historyService.history.conversationHistoryRecords[0].messageStatuses, conversation);
      
      conversation.messages.sort((a: ChatMessage, b: ChatMessage) => {
        return ((new Date(a.timestamp).getTime()) - (new Date(b.timestamp).getTime()));
      });
      
      //this.conversationEventSubject.next(new ConversationEvent(conversation.conversationId,ConvEvent.MSG_RECEIVED));
    }
  }
  
  private updateMessagesStatus(messageStatuses: any, conversation: Conversation) {
    messageStatuses.forEach(status => {
      const message = this.findMessageInConversationBySequence(status.seq, conversation);
      if (message) {
        
        if (status.messageDeliveryStatus === 'READ') {
          message.read = true;
        }
        
        if (status.messageDeliveryStatus === 'ACCEPT') {
          message.accepted = true;
        }
      }
    });
  }
  
  private checkIfConversationWasClosedInHistroy(history): boolean {
    return history && history.info && history.info.status === 'CLOSE';
  }
  
  private getPreviewImage(file): Observable<any> {
    const width = 100; // For scaling relative to width
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Observable(observer => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const elem = document.createElement('canvas');
          const scaleFactor = width / img.width;
          elem.width = width;
          elem.height = img.height * scaleFactor;
          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
          
          ctx.canvas.toBlob(
            blob => {
              const reader = new FileReader();
              reader.readAsDataURL(
                new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                }));
              reader.onload = () => {
                observer.next(
                  reader.result
                );
              }
            },
            'image/jpeg',
            1,
          );
        }),
          (reader.onerror = error => observer.error(error));
      };
    });
  }
  
}
