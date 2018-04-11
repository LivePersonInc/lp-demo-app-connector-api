import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInAnimation} from "../shared/animations/lp-animations";

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit {
  public  brandId: string;

  constructor() { }

  ngOnInit() {

  }

}
