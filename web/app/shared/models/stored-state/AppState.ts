import {Deserializable} from "../deserializable.model";

export class AppState implements Deserializable<AppState>{
  conversationId: string;
  appId: string;
  ext_consumer_id:string;
  userName: string

  deserialize(input: any): AppState {
    Object.assign(this, input);
    return this;
  }
}
