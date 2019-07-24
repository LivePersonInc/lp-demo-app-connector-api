import {Deserializable} from "../deserializable.model";

export class AppState implements Deserializable<AppState> {
  conversationId: string;
  appId: string;
  ext_consumer_id:string;
  userName: string;
  features: Array<string>;
  skillId: string;
  engagementId: number;
  campaignId: number;
  
  deserialize(input: any): AppState {
    Object.assign(this, input);
    return this;
  }
}

export class State implements Deserializable<State> {
  selectedAppId: string;
  states: Array<AppState>;

  deserialize(input: any): State {
    Object.assign(this, input);
    this.states = [];
    if(input.states && input.states.length) {
      input.states.forEach( state => {
        this.states.push(new AppState().deserialize(state));
      })
    }

    return this;
  }
}
