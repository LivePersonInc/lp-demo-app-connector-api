import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EndpointHeader} from '../../../shared/models/app-installation/endpointHeaders.model';
import {Event} from "../../../shared/models/app-installation/event.model";
import {NgForm} from "@angular/forms";
import {LpValidateEndpointService} from "../../../core/services/lp-validate-endpoint.service";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-lp-webhooks-event',
  templateUrl: './lp-webhooks-event.component.html',
  styleUrls: ['./lp-webhooks-event.component.scss'],
})
export class LpWebhooksEventComponent implements OnInit {
  private existingTypes: string[];
  private eventTypes: object = {};
  private composeEvent: Event;
  @Input() event: Event;
  @Input() avaliableEventTypes: {};
  @Input() createNewEvent: boolean;
  @Output() eventRemoved = new EventEmitter<Event>();
  @Output() eventCreated = new EventEmitter<Event>();

  constructor(private endpointValidationService: LpValidateEndpointService) {
  }

  ngOnInit() {
    this.existingTypes = [
      'ms.MessagingEventNotification.ContentEvent',
      'ms.MessagingEventNotification.RichContentEvent',
      'ms.MessagingEventNotification.AcceptStatusEvent',
      'ms.MessagingEventNotification.ChatStateEvent',
      'cqm.ExConversationChangeNotification'
    ]
    this.composeEvent = new Event(null, null, []);
    if (!this.createNewEvent && this.event) {
      this.checkEndpointValid(this.event.endpoint);
    }
    this.event = this.event ? this.event : new Event(null, null, []);
  }
  addNewEventType(form: NgForm) {
    this.composeEvent.headers = this.composeEvent.headers.filter(h => h.header_value && h.header_name);
    const event: Event = new Event(this.composeEvent.type, this.composeEvent.endpoint, this.composeEvent.headers)
    this.eventCreated.emit(event);
    form.resetForm();
    this.avaliableEventTypes[event.type] = {
      type: event.type,
      disabled: true
    };
  }
  removeFromEvents(event: Event, types) {
    this.avaliableEventTypes[event.type].disabled = false;
    this.eventRemoved.emit(event);
    console.log(this.eventTypes);
  }
  addNewEventHeaderRow() {
    this.composeEvent.headers.push(new EndpointHeader(null, null));
  }
  removeHeaderFromEventArray(header: EndpointHeader) {
    if (this.createNewEvent) {
      const index = this.composeEvent.headers.indexOf(header);
      this.composeEvent.headers.splice(index, 1);
    } else {
      const index = this.event.headers.indexOf(header);
      this.event.headers.splice(index, 1);
    }
  }
  checkEndpointValid(endpoint: string) {
    this.endpointValidationService.validateEndpoint(endpoint).pipe(timeout(10000)).subscribe(res => {
      if (res) {
        console.log(res);
        console.log("Valid");
        this.event.endpointValidation = 'valid';
      } else {
        console.log("Invalid");
        this.event.endpointValidation = 'invalid';
      }
    }, error => {
      if (error && error.status !== 0 && error.statusText === 'OK') {
        this.event.endpointValidation = 'valid';
      } else {
        this.event.endpointValidation = 'invalid';
      }
      console.log(error);
    });
  }
}
