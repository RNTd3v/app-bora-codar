import { IApiService, IAuthService, IConfigService, IStorageService } from ".";
import { ApiService } from "./api/api.service";
import { AuthService } from "./auth/auth.service";
import { ConfigService } from "./config/config.service";
import { StorageService } from './storage/storage.service';

export let servicesProviders = [
  { provide: IApiService, useClass: ApiService },
  { provide: IAuthService, useClass: AuthService },
  { provide: IConfigService, useClass: ConfigService },
  { provide: IStorageService, useClass: StorageService }
]
