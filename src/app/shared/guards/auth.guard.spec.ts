import { TestBed } from '@angular/core/testing';
import { IAuthService } from '..';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IAuthService]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('#constructor deve instanciar o Guard', () => {
    expect(guard).toBeTruthy();
  });
});
