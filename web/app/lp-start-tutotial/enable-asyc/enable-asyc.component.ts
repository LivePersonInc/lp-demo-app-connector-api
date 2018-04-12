import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lp-enable-asyc',
  templateUrl: './enable-asyc.component.html',
  styleUrls: ['./enable-asyc.component.scss']
})
export class EnableAsycComponent implements OnInit {

  @Input() brandId: string

  constructor() { }

  ngOnInit() {
  }

}
