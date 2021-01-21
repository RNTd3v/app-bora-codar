import { IApiService, IAuthService, IConfigService, IRoleService, IStorageService, IUserService } from ".";
import { ApiService } from "./api/api.service";
import { AuthService } from "./auth/auth.service";
import { ConfigService } from "./config/config.service";
import { RoleService } from "./role/role.service";
import { StorageService } from './storage/storage.service';
import { UserService } from "./user/user.service";

export let servicesProviders = [
  { provide: IApiService, useClass: ApiService },
  { provide: IAuthService, useClass: AuthService },
  { provide: IConfigService, useClass: ConfigService },
  { provide: IRoleService, useClass: RoleService },
  { provide: IStorageService, useClass: StorageService },
  { provide: IUserService, useClass: UserService },
]
