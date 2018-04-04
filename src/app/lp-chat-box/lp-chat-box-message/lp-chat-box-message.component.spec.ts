import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpChatBoxMessageComponent } from './lp-chat-box-message.component';

describe('LpChatBoxMessageComponent', () => {
  let component: LpChatBoxMessageComponent;
  let fixture: ComponentFixture<LpChatBoxMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpChatBoxMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpChatBoxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
