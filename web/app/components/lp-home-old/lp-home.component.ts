import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/lp-animations";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {LpConfirmationDialogComponent} from "../lp-confirmation-dialog/lp-confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {ConversationService} from "../../core/services/conversation.service";
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'lp-home-old',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeOldComponent implements OnInit {
  public brandId: string;
  public userName: string;
  public authenticationService: AuthenticationService;


  constructor(private _authenticationService: AuthenticationService,
              private router: Router,
              private conversationService: ConversationService,
              public dialog: MatDialog) {
    this.authenticationService = _authenticationService;
  }

  ngOnInit() {}

  public goToStartConfigPage() {
    this.router.navigateByUrl('settings/start');
  }

  public goToStartDemoPage() {
    this.router.navigateByUrl('demo');
  }

  public isConversationRestored(): boolean {
    if (this.conversationService.conversation) {
      return true;
    }
    return false;
  }


}
