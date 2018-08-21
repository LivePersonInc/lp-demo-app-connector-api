import { TestBed, async, inject } from '@angular/core/testing';

import { StateManager } from './state-manager';
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {ChatMessage, MessageType} from "../../shared/models/conversation/chatMessage.model";

describe('StateManager', () => {

  const brandId = "Le1234576586";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateManager]
    });
  });

  it('should inject the service', inject([StateManager], (intercptor: StateManager) => {
    expect(intercptor).toBeTruthy();
  }));

  it('should save the state in localstorage', inject([StateManager], (intercptor: StateManager) => {
      let conversation = new Conversation(brandId, "appKey", "appSecret", "usreName" );
      conversation.messages = [];
      let firstMessage = new ChatMessage(MessageType.sent,"125123523632","Hi","usreName","status", true);
      let seconMessage = new ChatMessage(MessageType.sent,"125123523632", "How are u?","usreName", "status", true);
      conversation.messages.push(firstMessage);
      conversation.messages.push(seconMessage);

      intercptor.storeLastConversationInLocalStorage(conversation);

      expect(localStorage.getItem(brandId)).toBeTruthy();

  }));

  it('should get the conversation from the localStorage ', inject([StateManager], (intercptor: StateManager) => {

    expect(intercptor.getLastStoredConversationByBrand(brandId)).toBeTruthy();


  }));

  it('should get the conversation deserialized from the localStorage ', inject([StateManager], (intercptor: StateManager) => {

    expect(intercptor.getLastStoredConversationByBrand(brandId).messages.length).toBe(2);


  }));

  it('Conversation should be deserialized in an object ', () =>{
    let conversation = new Conversation( null, null, null, null );

    console.log(localStorage.getItem(brandId));
    conversation.deserialize(localStorage.getItem(brandId));


    console.log(conversation.messages);

    expect(conversation).toEqual(jasmine.any(Object));


  });

  it('Conversation should contain 2 messages ', () =>{
    let conversation = new Conversation( null, null, null, null );

    conversation.deserialize(localStorage.getItem(brandId));

    expect(conversation.messages.length).toBe(2);

  });


});
