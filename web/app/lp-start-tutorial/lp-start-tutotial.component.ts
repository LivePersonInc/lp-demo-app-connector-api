import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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



  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }


}
