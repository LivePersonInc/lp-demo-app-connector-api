import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "./send-api.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class ConversationService {

  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService, private zone: NgZone, private  loadingService: LoadingService){

  }

}
