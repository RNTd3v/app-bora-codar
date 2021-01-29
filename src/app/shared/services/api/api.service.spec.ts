import { TestBed } from '@angular/core/testing';
import { IConfigService } from '@cms/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [IConfigService]
    });
    service = TestBed.inject(ApiService);
  });

  it('#constructor deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
