import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInAnimation} from "../shared/animations/lp-animations";

@Component({
  selector: 'app-lp-start-tutotial',
  templateUrl: './lp-start-tutotial.component.html',
  styleUrls: ['./lp-start-tutotial.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpStartTutotialComponent implements OnInit {

  public brandId: string;
  public stepsCompleted: Array<boolean>


  constructor(private route: ActivatedRoute, private router: Router) { }

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
    this.router.navigateByUrl('/demo');
  }

}
