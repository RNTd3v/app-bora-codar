import { TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';

import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleService, IApiService]
    });
    service = TestBed.inject(RoleService);
  });

  it('#constructor deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
