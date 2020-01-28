import {Capabilities} from './capabilities.model';
import {Deserializable} from '../deserializable.model';

export class AppInstall implements Deserializable<AppInstall> {
  client_name: string;
  description: string;
  enabled: boolean;
  grant_types: Array<string>;
  scope: string;
  logo_uri: string;
  capabilities: Capabilities;
  client_id_issued_at: number;
  client_secret_expires_at: number;
  client_id: string;
  client_secret: string;
  id: string;
  deleted: boolean;
  
  deserialize(input: any): AppInstall {
    Object.assign(this, input);
    input.capabilities ? this.capabilities = new Capabilities().deserialize(input.capabilities) : null;
    return this;
  }
}
