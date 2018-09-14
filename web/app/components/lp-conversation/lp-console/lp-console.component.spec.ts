import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConsoleComponent } from './lp-console.component';
import {MaterialModule} from "../../../material.module";
import {ConversationService} from "../../../core/services/conversation.service";

describe('LpConsoleComponent', () => {
  let component: LpConsoleComponent;
  let fixture: ComponentFixture<LpConsoleComponent>;
  const conversationService = jasmine.createSpy( 'ConversationService');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ LpConsoleComponent ],
      providers: [
        {provide: ConversationService, useValue: conversationService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
   fixture = TestBed.createComponent(LpConsoleComponent);
   component = fixture.componentInstance;
  // fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeDefined();
  });
});
