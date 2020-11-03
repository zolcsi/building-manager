import {
  Component,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nickname-item',
  templateUrl: './nickname-item.component.html',
  styleUrls: ['./nickname-item.component.scss']
})
export class NicknameItemComponent {

  @Input() form: FormControl;

  constructor() {
    this.form = new FormControl();
  }
}
