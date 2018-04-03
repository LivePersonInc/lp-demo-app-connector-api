import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConversationComponent } from './lp-conversation.component';

describe('LpConversationComponent', () => {
  let component: LpConversationComponent;
  let fixture: ComponentFixture<LpConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
