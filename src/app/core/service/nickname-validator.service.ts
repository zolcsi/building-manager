import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NicknameValidatorService {

  private readonly VALID_START = 'a';

  constructor() { }

  isValidNickname(nickname: string): Observable<boolean> {
    return ((nickname && nickname.startsWith(this.VALID_START)) ? of(true) : of(false));
  }
}
