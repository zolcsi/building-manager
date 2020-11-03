import { NicknameAsyncValidator } from './nickname-async-validator';
import { NicknameValidatorService } from '../service/nickname-validator.service';
import {
  AsyncValidatorFn,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';

describe('NicknameAsyncValidator', () => {

  let finished = false;
  let nicknameAsyncValidatorFn: AsyncValidatorFn;

  beforeEach(() => {
    finished = false;
    nicknameAsyncValidatorFn = NicknameAsyncValidator.createValidator(new NicknameValidatorService());
  });


  // BASIC CHECK
  it('should create an instance', () => {
    expect(nicknameAsyncValidatorFn).toBeTruthy();
  });


  // HAPPY CASE
  it('should return null, meaning no errors were identified', () => {
    const form = new FormControl('aValidNickname');
    (nicknameAsyncValidatorFn(form) as Observable<ValidationErrors>)
      .subscribe((validationErrors: ValidationErrors) => {
        expect(validationErrors).toBeNull();
        finished = true;
      });
    expect(finished).toBeTrue();
  });


  // ERROR CASES
  it('should return with an error entry, because it is not starting with an "a"', () => {
    const form = new FormControl('invalidNickname');
    (nicknameAsyncValidatorFn(form) as Observable<ValidationErrors>)
      .subscribe((validationErrors: ValidationErrors) => {
        expect((Object.keys(validationErrors)).length).toEqual(1);
        expect(validationErrors.invalidStart).toBeTrue();
        finished = true;
      });
    expect(finished).toBeTrue();
  });

  it('should return with an error entry, because empty string does not start with an "a"', () => {
    const form = new FormControl('');
    (nicknameAsyncValidatorFn(form) as Observable<ValidationErrors>)
      .subscribe((validationErrors: ValidationErrors) => {
        expect((Object.keys(validationErrors)).length).toEqual(1);
        expect(validationErrors.invalidStart).toBeTrue();
        finished = true;
      });
    expect(finished).toBeTrue();
  });
});
