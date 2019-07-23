import {Deserializable} from "../deserializable.model";

export class EndpointHeader implements Deserializable<EndpointHeader> {
  header_name: string;
  header_value: string;

  constructor(header_name: string, header_value: string) {
    this.header_value = header_name;
    this.header_name = header_value;
  }

  deserialize(input: any): EndpointHeader {
    Object.assign(this, input);
    return this;
  }

  isEndpointEmpty(): boolean {
    return (!this.header_name || this.header_name === undefined || this.header_name === '' || this.header_name.length === 0
    || !this.header_value || this.header_value === undefined || this.header_value === '' || this.header_value.length === 0);
  }
}
