import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../shared/animations/lp-animations';

@Component({
  selector: 'lp-demo',
  templateUrl: './lp-demo.component.html',
  styleUrls: ['./lp-demo.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpDemoComponent implements OnInit, OnDestroy {
  
  constructor() {
  }
  
  
  ngOnInit() {
  }
  
  ngOnDestroy() {
  
  }
}
