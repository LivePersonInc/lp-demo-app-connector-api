import {Component, OnInit} from "@angular/core";
import {fadeInAnimation} from "../../shared/animations/lp-animations";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {ConversationService} from "../../core/services/conversation.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss']
  // animations: [fadeInAnimation],
  // host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit {
  public brandId: string;
  public userName: string;
  public authenticationService: AuthenticationService;


  constructor() {

  }

  ngOnInit() {}

  public goToStartConfigPage() {
    // this.router.navigateByUrl('settings/start');
  }

  public goToStartDemoPage() {
    // this.router.navigateByUrl('demo');
  }

  public isConversationRestored(): boolean {
    // if (this.conversationService.conversation) {
    //   return true;
    // }
    return false;
  }


}
