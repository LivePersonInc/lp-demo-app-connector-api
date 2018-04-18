import {Deserializable} from "../deserializable.model";

export class Endpoint implements Deserializable<Endpoint>
{
  endpoint: string;
  headers: Array<any>;
  max_retries: number;
  constructor(){
    this.endpoint = "https://";
  }
  deserialize(input: any): Endpoint {
    Object.assign(this, input);
    return this;
  }
}
