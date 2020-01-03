import {Deserializable} from '../deserializable.model';
import {Webhooks} from './webhooks.model';
import {Engagement} from './engagement.model';

export class Capabilities implements Deserializable<Capabilities> {
  engagement: Engagement;
  webhooks: Webhooks;
  
  constructor() {
    this.engagement = null;
    this.webhooks = null;
  }
  
  deserialize(input: any): Capabilities {
    Object.assign(this, input);
    input.webhooks ? this.webhooks = new Webhooks().deserialize(input.webhooks) : this.webhooks = null;
    input.engagement ? this.engagement = new Engagement().deserialize(input.engagement) : this.engagement = null;
    return this;
  }
  
}
