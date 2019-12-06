import {Deserializable} from "../deserializable.model";
import {EndpointHeader} from "./endpointHeaders.model";

export class Endpoint implements Deserializable<Endpoint>
{
  endpoint: string;
  headers: Array<EndpointHeader>;
  max_retries: number;
  constructor() {
    // this.endpoint = '';
    this.headers = [];
  }

  deserialize(input: any): Endpoint {
    Object.assign(this, input);
    return this;
  }

  isEndpointEmpty(): boolean {
    return (!this.endpoint || this.endpoint === undefined || this.endpoint === "" || this.endpoint.length === 0);
  }
}
