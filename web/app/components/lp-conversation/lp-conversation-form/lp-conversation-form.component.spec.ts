import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConversationFormComponent } from './lp-conversation-form.component';

describe('LpConversationFormComponent', () => {
  let component: LpConversationFormComponent;
  let fixture: ComponentFixture<LpConversationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpConversationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpConversationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
