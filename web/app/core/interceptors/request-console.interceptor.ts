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
      if (err instanceof HttpErrorResponse && this.conversationService.conversation) {
        if(this.conversationService.conversation) {
          consoleRequest.status = err.status;
          this.conversationService.conversation.sentRequests.push(consoleRequest);
        }
      }
    });
  }

  private getServiceNameByUrl(stringUrl: string): string{
    const url = new URL(stringUrl);
    return url.pathname.split('/')[1];
  }

  private setConsoleRequestBeforeResponse(reportingRequest: HttpRequest<any>,consoleRequest: SentRequestModel, ) {
    consoleRequest.type = reportingRequest.method;
    consoleRequest.title = this.getServiceNameByUrl(reportingRequest.url);
    consoleRequest.headers = reportingRequest.headers;

    if(reportingRequest.hasOwnProperty('body') && typeof reportingRequest.body == 'string'){
      consoleRequest.payload = JSON.parse(reportingRequest.body);
    }else {
      consoleRequest.payload = reportingRequest.body;
    }

  }

  private setConsoleRequestAfterResponse(event: HttpResponse<any>,consoleRequest: SentRequestModel, ) {
    if(this.conversationService.conversation && event.status && event.status != 204) {
      consoleRequest.status = event.status;
      consoleRequest.response = event.body;

      if(this.isConsumerJWSRequest(event.body)){
        consoleRequest.title = "Get Consumer JWS"
      }
      if(this.isAPPJWTRequest(event.body)){
        consoleRequest.title = "Get APP JWT"

      }
      this.conversationService.conversation.sentRequests.push(consoleRequest);
    }
  }

  private isConsumerJWSRequest(responseBody: any): boolean {
    return responseBody && responseBody.hasOwnProperty("token");
  }

  private isAPPJWTRequest(responseBody:any): boolean {
    return responseBody && responseBody.hasOwnProperty("token_type");
  }

}
