import { IApiService, IAsideService, IAuthService, IPaginationService, IStorageService, IUIStateService, LoaderService } from '.';
import { ApiService } from './api/api.service';
import { AsideService } from './aside/aside.service';
import { AuthService } from './auth/auth.service';
import { PaginationService } from './pagination/pagination.service';
import { StorageService } from './storage/storage.service';
import { UiStateService } from './ui-state/ui-state.service';

export let servicesProviders = [
  { provide: IApiService, useClass: ApiService },
  { provide: IAsideService, useClass: AsideService },
  { provide: IAuthService, useClass: AuthService },
  { provide: IPaginationService, useClass: PaginationService },
  { provide: IStorageService, useClass: StorageService },
  { provide: IUIStateService, useClass: UiStateService },
  LoaderService
];
