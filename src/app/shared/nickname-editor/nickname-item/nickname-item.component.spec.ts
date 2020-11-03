import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { NicknameItemComponent } from './nickname-item.component';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NicknameAsyncValidator } from '../../../core/validator/nickname-async-validator';
import { Component } from '@angular/core';
import { NicknameValidatorService } from '../../../core/service/nickname-validator.service';
import { MaterialModule } from '../../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NicknameItemComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NicknameItemComponent, TestHostComponent],
      imports: [MaterialModule, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });


  // BASIC CHECK
  it('should check the display of the elements', () => {
    expect(hostComponent).toBeTruthy();

    const htmlElement: HTMLElement = fixture.nativeElement;
    const label = htmlElement.querySelector('mat-label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toEqual('Nickname');

    const nicknameInput = htmlElement.querySelector('input');
    expect(nicknameInput).toBeTruthy();
    expect(nicknameInput?.textContent).toEqual('');
  });


  // VALID NICKNAME
  it('should show validation message on empty string input', () => {

    // prepare
    const nicknameInput = fixture.nativeElement.querySelector('input');
    nicknameInput.value = 'aValidName';

    // action
    nicknameInput.dispatchEvent(new Event('input'));
    hostComponent.localFormControl.markAllAsTouched();
    fixture.detectChanges();

    // verify
    const validation = fixture.nativeElement.querySelector('.alert > div');
    expect(validation).toBeFalsy();
  });


  // INVALID NICKNAME
  it('should show validation message on empty string input', () => {

    // prepare
    const nicknameInput = fixture.nativeElement.querySelector('input');
    nicknameInput.value = '';

    // action
    nicknameInput.dispatchEvent(new Event('input'));
    hostComponent.localFormControl.markAllAsTouched();
    fixture.detectChanges();

    // verify
    const validation = fixture.nativeElement.querySelector('.alert > div');
    expect(validation).toBeTruthy();
    expect(validation.textContent).toEqual('Nickname is required.');
  });

  it('should show validation message on nickname not having \'a\' as first character', () => {

    // prepare
    const nicknameInput = fixture.nativeElement.querySelector('input');
    nicknameInput.value = 'invalidNickname';

    // action
    nicknameInput.dispatchEvent(new Event('input'));
    hostComponent.localFormControl.markAllAsTouched();
    fixture.detectChanges();

    // verify
    const validation = fixture.nativeElement.querySelector('.alert > div');
    expect(validation).toBeTruthy();
    expect(validation.textContent).toEqual('Nickname must start with \'a\'.');
  });
});


@Component({
  template: `
    <app-nickname-item
      [form]="localFormControl">
    </app-nickname-item>`
})
class TestHostComponent {
  localFormControl = new FormControl('', [Validators.required],
    [NicknameAsyncValidator.createValidator(new NicknameValidatorService())]
  );
}
