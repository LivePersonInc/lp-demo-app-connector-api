import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "./send-api.service";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConversationService extends HttpService{

  private conversationList; // Conversation

  constructor(protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService, sendApiService: SendApiService){
    super(snackBar,http, loadingService);
    this.conversationList = [];

  }

  public OpenNewConversation(initialMessage: string) {

  }



}
