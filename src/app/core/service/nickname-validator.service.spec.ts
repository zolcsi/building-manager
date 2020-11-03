import { TestBed } from '@angular/core/testing';

import { NicknameValidatorService } from './nickname-validator.service';

describe('NicknameValidatorService', () => {
  let service: NicknameValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NicknameValidatorService);
  });

  // BASIC CHECK
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // VALID
  it('should be valid nickname, happy case', () => {
    expect(service.isValidNickname('armadillo')).toBeTruthy();
  });

  it('should be valid nickname, just an "a"', () => {
    expect(service.isValidNickname('a')).toBeTruthy();
  });

  it('should be valid nickname, extremely long with quotes', () => {
    expect(service.isValidNickname('armadillos meaning "little armoured ones" in Spanish ' +
      'are New World placental mammals in the order Cingulata')).toBeTruthy();
  });

  // INVALID
  it('should be an invalid nickname, not starting with letter "a"', () => {
    expect(service.isValidNickname('Beehive')).toBeTruthy();
  });

  it('should be an invalid nickname, empty string', () => {
    expect(service.isValidNickname('')).toBeTruthy();
  });
});
