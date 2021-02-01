import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiService, OptionsApi } from '@cms/core';
import { Observable } from 'rxjs';
import { IUploadService } from './upload.service.interface';

@Injectable()
export class UploadService implements IUploadService {

  constructor(private apiService: IApiService) { }

  saveUserAvatar(avatar: FormData, userID: string): Observable<void> {
    return this.apiService.patch(`v1/users/${userID}/avatar`, avatar);
  }
}
