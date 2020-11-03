import { NicknameValidatorService } from '../service/nickname-validator.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class NicknameAsyncValidator {

  private static readonly invalidStartError = {invalidStart: true} as ValidationErrors;

  static createValidator(nicknameValidatorService: NicknameValidatorService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return nicknameValidatorService.isValidNickname(control.value)
        .pipe(
          map((result: boolean) => result ? null : NicknameAsyncValidator.invalidStartError)
        );
    };
  }
}
