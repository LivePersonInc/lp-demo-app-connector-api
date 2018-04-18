import {Deserializable} from "../deserializable.model";
import {Webhooks} from "./webhooks.model";

export class Capabilities implements Deserializable<Capabilities>{
  engagement: object;
  webhooks: Webhooks;

  deserialize(input: any): Capabilities {
    Object.assign(this, input);
    input.webhooks ? this.webhooks = new Webhooks().deserialize(input.webhooks): this.webhooks = null;
    return this;
  }

}
