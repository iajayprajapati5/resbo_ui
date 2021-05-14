import { Attribute, Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[mustMatch][formControlName],[mustMatch][formControl],[mustMatch][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MustMatchDirective), multi: true}]
})
export class MustMatchDirective implements Validators{

  constructor( @Attribute('mustMatch') public mustMatch: string, @Attribute('reverse') public reverse: string) {}

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true: false;
  }

  validate(control: AbstractControl): { [key: string]: any } | any {
    // self value (e.g. retype password)
    let selfValue = control.value;

    // control value (e.g. password)
    let controlToMatch = control.root.get(this.mustMatch);

    // value not equal
    if (controlToMatch && selfValue !== controlToMatch.value && !this.isReverse) return {
        mustMatch: true
    }

    // value equal and reverse
    if (controlToMatch && selfValue === controlToMatch.value && this.isReverse) {
      if(controlToMatch?.errors){
        delete controlToMatch.errors['mustMatch'];
        if (!Object.keys(controlToMatch.errors).length) controlToMatch.setErrors(null);
      }
    }

    // value not equal and reverse
    if (controlToMatch && selfValue !== controlToMatch.value && this.isReverse) {
      controlToMatch.setErrors({ mustMatch: true });
    }

    return null;
  }
}
