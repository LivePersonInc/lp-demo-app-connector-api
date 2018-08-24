import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'lp-login',
  templateUrl: './lp-login.component.html',
  styleUrls: ['./lp-login.component.scss']
})
export class LpLoginComponent implements OnInit {
  public brandId: string;
  public userName: string;
  public password: string;
  public loginForm: FormGroup;

  @Output() onLogin = new EventEmitter<any>();

  constructor(private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      'brand': new FormControl('', [Validators.required],),
      'email': new FormControl('', [Validators.required],),
      'password': new FormControl('', [Validators.required],)
    });
  }

  public authenticate() {
      this.onLogin.emit({'brandId':this.brandId,'userName':this.userName,'password':this.password});
  }

}
