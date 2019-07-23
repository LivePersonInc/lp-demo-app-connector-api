import { Directive } from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appLpDetailsScopeValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: LpDetailsScopeValidationDirective, multi: true}]
})
export class LpDetailsScopeValidationDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const isValidScope = /^((msg\.consumer|livedeflect|faas(?:\.[a-z]+)+)(\\s(?!$)|(?=$)))+$/.test(c.value);
    const message = {
      scope: {
        message: 'Please enter a valid scope. Possible values: msg.consumer, livedeflect, faas*'
      }
    };
    return c.value && !isValidScope ? message : null;
  }

}
