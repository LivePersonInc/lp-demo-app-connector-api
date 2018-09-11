import {Deserializable} from "../deserializable.model";

export class AppState implements Deserializable<AppState>{
  conversationId: string;
  appId: string;

  deserialize(input: any): AppState {
    Object.assign(this, input);
    return this;
  }
}
