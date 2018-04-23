import {Deserializable} from "../deserializable.model";

export class Endpoint implements Deserializable<Endpoint>
{
  endpoint: string;
  headers: Array<any>;
  max_retries: number;
  constructor(){
    this.endpoint = "";
  }
  deserialize(input: any): Endpoint {
    Object.assign(this, input);
    return this;
  }

  isEndpointEmpty(): boolean{
    return (!this.endpoint || this.endpoint == undefined || this.endpoint == "" || this.endpoint.length == 0);
  }
}
