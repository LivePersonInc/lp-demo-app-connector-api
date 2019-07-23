import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LpValidateEndpointService {

  constructor(private client: HttpClient) { }

  validateEndpoint(endpoint: string) {
    return this.client.get(endpoint);
  }
}
