import {EventHeader} from '../lp-webhooks-headers/EventHeader';

export interface Event {
  type: string;
  endpoint: string;
  headers: EventHeader[];
  endpointValidation?: string;
}
