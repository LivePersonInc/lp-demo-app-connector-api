import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpChatBoxComponent } from './lp-chat-box.component';
import {LpChatBoxFooterComponent} from "./lp-chat-box-footer/lp-chat-box-footer.component";
import {LpChatBoxMessageComponent} from "./lp-chat-box-message/lp-chat-box-message.component";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../material.module";

describe('LpChatBoxComponent', () => {
  let component: LpChatBoxComponent;
  let fixture: ComponentFixture<LpChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LpChatBoxComponent, LpChatBoxFooterComponent, LpChatBoxMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
