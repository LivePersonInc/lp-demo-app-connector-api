import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {ConversationService} from "../services/conversation.service";
import {SentRequestModel} from "../../shared/models/conversation/sentRequest.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class RequestConsoleInterceptor implements HttpInterceptor {

  constructor(private conversationService: ConversationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const domainKey = this.getServiceNameByUrl(request.url);

    console.log("RequestConsoleInterceptor");

    if(this.conversationService.conversation) {
       const consoleRequest = new SentRequestModel();
      consoleRequest.type = request.method;
      consoleRequest.title = domainKey;
      consoleRequest.payload = request.body;
      consoleRequest.headers = request.headers;

       this.conversationService.conversation.sentRequests.push(consoleRequest);
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      console.log("RequestConsoleInterceptor RESPONSE");


    }, (err: any) => {
      console.log("RequestConsoleInterceptor RESPONSE");

      if (err instanceof HttpErrorResponse) {
        // do error handling here
      }
    });
  }

  getServiceNameByUrl(stringUrl: string): string{
    const url = new URL(stringUrl);
    return url.pathname.split('/')[1];
  }
}
