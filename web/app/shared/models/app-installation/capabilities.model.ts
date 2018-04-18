import {Deserializable} from "../deserializable.model";

export class Capabilities implements Deserializable<Capabilities>{
  engagement: object;
  webhooks: object;

  deserialize(input: any): Capabilities {
    Object.assign(this, input);
    return this;
  }

}
