import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInAnimation} from "../../shared/animations/lp-animations";
import {InstallationService} from "../../core/services/installation.service";
import {ConversationService} from "../../core/services/conversation.service";

@Component({
  selector: 'app-lp-start-tutotial',
  templateUrl: './lp-start-tutotial.component.html',
  styleUrls: ['./lp-start-tutotial.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpStartTutotialComponent implements OnInit {

  public brandId: string;
  public stepsCompleted: Array<boolean>;


  constructor(private router: Router,
              private conversationService:ConversationService) { }

  ngOnInit() {
     this.stepsCompleted = new Array(4);
  }

  public onCompleted(completed: boolean, step: number){
    this.stepsCompleted[step] = completed;
    if(step === 1){
      this.stepsCompleted[2] = true;
    }
  }

  public done() {
    this.conversationService.reset();
    this.conversationService.restoreStoredState("");
    this.router.navigateByUrl('/demo');
  }

}
