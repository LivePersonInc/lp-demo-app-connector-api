import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'lp-input-file-button',
  templateUrl: './lp-input-file-button.component.html',
  styleUrls: ['./lp-input-file-button.component.scss']
})
export class LpInputFileButtonComponent implements OnInit {

  @Output() fileSelected = new EventEmitter<Event>();
  @Input()  btnDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  public onFileSelected(event) {
    this.fileSelected.emit(event);
  }

}
