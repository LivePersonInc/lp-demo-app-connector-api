import {Deserializable} from '../deserializable.model';

export class Engagement implements Deserializable<Engagement> {
  design_engagement: boolean;
  design_window: boolean;
  entry_point: Array<string>;
  visitor_behavior: Array<string>;
  target_audience: Array<string>;
  goal: Array<string>;
  consumer_identity: Array<string>;
  language_selection: boolean;
  
  
  deserialize(input: any): Engagement {
    Object.assign(this, input);
    return this;
  }
  
}
