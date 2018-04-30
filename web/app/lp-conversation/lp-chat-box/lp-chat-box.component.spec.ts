import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpChatBoxComponent } from './lp-chat-box.component';

describe('LpChatBoxComponent', () => {
  let component: LpChatBoxComponent;
  let fixture: ComponentFixture<LpChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpChatBoxComponent ]
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
