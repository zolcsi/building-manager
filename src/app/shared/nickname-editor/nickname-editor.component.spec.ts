import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { NicknameEditorComponent } from './nickname-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NicknameItemComponent } from './nickname-item/nickname-item.component';
import { MaterialModule } from '../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NicknameEditorComponent', () => {
  let finished = false;
  let component: NicknameEditorComponent;
  let fixture: ComponentFixture<NicknameEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NicknameItemComponent, NicknameEditorComponent],
      imports: [MaterialModule, NoopAnimationsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    finished = false;
    fixture = TestBed.createComponent(NicknameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // BASIC CHECK
  it('should check the display of the elements', () => {
    expect(component).toBeTruthy();

    const title = fixture.nativeElement.querySelector('.title');
    expect(title.textContent).toEqual('Nickname Editor');
  });


  // HAPPY CASE for 2 nicknames
  it('should add two valid nicknames and submit the form', () => {

    // add 2 new nickname inputs
    const buttonAdd = fixture.nativeElement.querySelector('.button-add');
    buttonAdd.click();
    buttonAdd.click();
    fixture.detectChanges();

    // fill them out with valid nicknames
    const nicknameInputs = fixture.nativeElement.querySelectorAll('input');

    const nicknameInput1 = nicknameInputs[0];
    nicknameInput1.value = 'aFirstNickname';
    nicknameInput1.dispatchEvent(new Event('input'));

    const nicknameInput2 = nicknameInputs[1];
    nicknameInput2.value = 'aSecondNickname';
    nicknameInput2.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // set up verification
    component.nicknamesSubmitted.subscribe((nicknames: string[]) => {
      expect(nicknames.length).toEqual(2);
      expect(nicknames[0]).toEqual('aFirstNickname');
      expect(nicknames[1]).toEqual('aSecondNickname');
      finished = true;
    });

    // submit the form
    const buttonSubmit = fixture.nativeElement.querySelector('.button-submit');
    buttonSubmit.click();
    fixture.detectChanges();

    expect(finished).toBeTrue();
  });
});
