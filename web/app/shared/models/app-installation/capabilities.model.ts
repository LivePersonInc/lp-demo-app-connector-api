import {Deserializable} from "../deserializable.model";

export class Capabilities implements Deserializable{
  engagement: object;
  webhooks: object;

  deserialize(input: any): Capabilities {
    Object.assign(this, input);
    return this;
  }

}
