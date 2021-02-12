import { TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, IApiService]
    });
    service = TestBed.inject(UserService);
  });

  it('#constructor deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
