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
    return next.handle(reportingRequest).do((event: HttpResponse<any>) => {

      if(this.conversationService.conversation && event.status && event.status != 204) { // we dont want 204 calls of CORS
        if(this.conversationService.conversation) {
          const consoleRequest = new SentRequestModel();

          consoleRequest.type = reportingRequest.method;

          consoleRequest.title = this.getServiceNameByUrl(reportingRequest.url);
          consoleRequest.payload = reportingRequest.body;
          consoleRequest.headers = reportingRequest.headers;
          console.log("RequestConsoleInterceptor RESPONSE");
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

    }, (err: any) => {
      console.log("RequestConsoleInterceptor RESPONSE");

      if (err instanceof HttpErrorResponse && this.conversationService.conversation) {
        // do error handling here

        if(this.conversationService.conversation) {
          console.log("RequestConsoleInterceptor RESPONSE");
          //consoleRequest.status = err.status;

         // this.conversationService.conversation.sentRequests.push(consoleRequest);
        }

      }
    });
  }

  getServiceNameByUrl(stringUrl: string): string{
    const url = new URL(stringUrl);
    return url.pathname.split('/')[1];
  }

  private isConsumerJWSRequest(responseBody: any): boolean {
    if(responseBody && responseBody.hasOwnProperty("token")){
      return true;
    }
    return false;
  }

  private isAPPJWTRequest(responseBody:any): boolean {
    if(responseBody && responseBody.hasOwnProperty("token_type")){
      return true;
    }
    return false;
  }

}
