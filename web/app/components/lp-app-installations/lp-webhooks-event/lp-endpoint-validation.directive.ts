import { Directive } from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appLpEndpointValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: LpEndpointValidationDirective, multi: true}]
})
export class LpEndpointValidationDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const isWrongEnpoint = /^https\:\/\/[0-9a-zA-Z]([-\.\\w]*[0-9a-zA-Z])*(\:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\:'\\/\\\\\\+=&;%\\$#_]*)?$/.test(c.value);
    const message = {
      endpoint: {
        message: 'Please enter a valid endpoint'
      }
    };
    return isWrongEnpoint ? null : message;
  }

}
