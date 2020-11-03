import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NicknameAsyncValidator } from '../../core/validator/nickname-async-validator';
import { NicknameValidatorService } from '../../core/service/nickname-validator.service';

@Component({
  selector: 'app-nickname-editor',
  templateUrl: './nickname-editor.component.html',
  styleUrls: ['./nickname-editor.component.scss']
})
export class NicknameEditorComponent implements OnInit {

  @Input() nicknames: string[] = [];
  @Output() nicknamesSubmitted: EventEmitter<string[]> = new EventEmitter<string[]>();
  nicknamesForm: FormGroup;

  constructor(private nicknameValidatorService: NicknameValidatorService) {
    this.nicknamesForm = new FormGroup({
      nicknamesArray: new FormArray([])
    });
  }

  ngOnInit(): void {
    for (const nickname of this.nicknames) {
      this.addNickname(nickname);
    }
  }

  get nicknamesFormArray(): FormArray {
    return this.nicknamesForm.get('nicknamesArray') as FormArray;
  }

  getNicknamesFormArrayAt(index: number): FormControl {
    return (this.nicknamesFormArray.controls[index]) as FormControl;
  }

  addNickname(value: string): void {
    this.nicknamesFormArray.push(new FormControl(value,
      [Validators.required],
      [NicknameAsyncValidator.createValidator(this.nicknameValidatorService)]
    ));
  }

  removeNickname(index: number): void {
    this.nicknamesFormArray.removeAt(index);
  }

  onSubmit(): void {
    this.nicknamesSubmitted.emit(this.nicknamesFormArray.value);
  }
}
