import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {ConversationService} from "../services/conversation.service";
import {SentRequestModel} from "../../shared/models/conversation/sentRequest.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class RequestConsoleInterceptor implements HttpInterceptor {

  constructor(private conversationService: ConversationService) {}

  intercept(reportingRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const consoleRequest = new SentRequestModel();

    this.setConsoleRequestBeforeResponse(reportingRequest, consoleRequest);

    return next.handle(reportingRequest).do((event: HttpResponse<any>) => {

      this.setConsoleRequestAfterResponse(event, consoleRequest);

    }, (err: any) => {
      if (this.isAnHttpErrorResponseAndConversationExists(err)) {
        consoleRequest.status = err.status;
        this.conversationService.conversation.sentRequests.push(consoleRequest);
      }
    });
  }

  private setConsoleRequestBeforeResponse(reportingRequest: HttpRequest<any>,consoleRequest: SentRequestModel, ) {
    consoleRequest.type = reportingRequest.method;

    this.addHeadersToConsoleRequest(reportingRequest, consoleRequest);
    this.addBodyToConsoleRequest(reportingRequest, consoleRequest);
    this.setTittleToConsoleRequest(reportingRequest, consoleRequest);
  }

  private addHeadersToConsoleRequest(reportingRequest: HttpRequest<any>, consoleRequest: SentRequestModel) {
    const keys = reportingRequest.headers.keys();
    consoleRequest.headers = [];
    keys.forEach(key => {
      consoleRequest.headers.push("{" + key + ": " + reportingRequest.headers.get(key) + "}");
    });
  }

  private addBodyToConsoleRequest(reportingRequest: HttpRequest<any>, consoleRequest: SentRequestModel) {
    if (reportingRequest.hasOwnProperty('body') && typeof reportingRequest.body == 'string') {
      consoleRequest.payload = JSON.parse(reportingRequest.body);
    } else {
      consoleRequest.payload = reportingRequest.body;
    }
  }

  private setTittleToConsoleRequest(reportingRequest: HttpRequest<any>, consoleRequest: SentRequestModel,) {

    if(consoleRequest.payload && consoleRequest.payload.hasOwnProperty('type')) {
        consoleRequest.title = consoleRequest.payload.type;
    }else if (this.isCloseConversation(reportingRequest.url)) {
      consoleRequest.title = "CLOSE CONVERSATION";
    }else if (this.isOpenConversation(reportingRequest.url)) {
      consoleRequest.title = "OPEN CONVERSATION";
    }else if (this.isConsumerJWSRequest(reportingRequest.url)) {
      consoleRequest.title = "Get Consumer JWS";
    } else if (this.isAPPJWTRequest(reportingRequest.url)) {
      consoleRequest.title = "Get APP JWT";
    }else {
      consoleRequest.title = this.getServiceNameByUrl(reportingRequest.url); //default
    }
  }

  private setConsoleRequestAfterResponse(event: HttpResponse<any>,consoleRequest: SentRequestModel, ) {
    if(this.conversationService.conversation && event.status && event.status !== 204) {
      consoleRequest.status = event.status;
      consoleRequest.response = event.body;

      this.conversationService.conversation.sentRequests.push(consoleRequest);
    }
  }

  private getServiceNameByUrl(stringUrl: string): string{
    const url = new URL(stringUrl);
    return url.pathname.split('/')[1];
  }

  private isConsumerJWSRequest(stringUrl:string): boolean {
    return new URL(stringUrl).pathname.split('/')[2] === 'account' ;
  }

  private isAPPJWTRequest(stringUrl:string): boolean {
    return new URL(stringUrl).pathname.split('/')[1] === 'sentinel' ;
  }

  private isOpenConversation(stringUrl:string): boolean {
    return new URL(stringUrl).pathname.split('/')[2] === 'openconv' ;
  }

  private isCloseConversation(stringUrl: string): boolean {
    return new URL(stringUrl).pathname.split('/')[2] === 'close' ;
  }

  private isAnHttpErrorResponseAndConversationExists(err: any) {
    return err instanceof HttpErrorResponse && this.conversationService.conversation;
  }

}
