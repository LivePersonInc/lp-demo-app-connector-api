import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpChatBoxFooterComponent } from './lp-chat-box-footer.component';

describe('LpChatBoxFooterComponent', () => {
  let component: LpChatBoxFooterComponent;
  let fixture: ComponentFixture<LpChatBoxFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpChatBoxFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpChatBoxFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
