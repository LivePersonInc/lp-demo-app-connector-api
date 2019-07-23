import {Deserializable} from "../deserializable.model";
import {EndpointHeader} from "./endpointHeaders.model";

export class Event implements Deserializable<Event> {
  type: string;
  endpoint: string;
  headers: EndpointHeader[];
  endpointValidation?: string;

  constructor(type: string, endpoint: string, headers: EndpointHeader[] = []) {
    this.type = type;
    this.endpoint = endpoint;
    this.headers = [];
    headers.forEach(h => this.headers.push(new EndpointHeader(h.header_name, h.header_value)));
    this.endpointValidation = 'checking';
  }
  deserialize(input: any): Event {
    Object.assign(this, input);
    return this;
  }

  isEventEmpty(): boolean {
    return (!this.type || this.type === undefined || this.type === '' || this.type.length === 0
      || !this.endpoint || this.endpoint === undefined || this.endpoint === '' || this.endpoint.length === 0);
  }
}
