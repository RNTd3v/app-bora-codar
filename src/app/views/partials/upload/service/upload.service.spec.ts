import { TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';

import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadService, IApiService]
    });
    service = TestBed.inject(UploadService);
  });

  it('#constructor deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
