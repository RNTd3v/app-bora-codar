import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IStorageService, IApiService } from '@cms/core';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [IApiService, IStorageService]
    });
    service = TestBed.inject(AuthService);
  });

  it('#constructor deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
