import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpConversationFormComponent } from './lp-conversation-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";

describe('LpConversationFormComponent', () => {
  let component: LpConversationFormComponent;
  let fixture: ComponentFixture<LpConversationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
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
