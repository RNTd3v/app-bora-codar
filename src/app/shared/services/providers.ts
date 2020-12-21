import { IApiService, IAuthService, IConfigService, IUserService } from ".";
import { ApiService } from "./api/api.service";
import { AuthService } from "./auth/auth.service";
import { ConfigService } from "./config/config.service";
import { UserService } from "./user/user.service";

export let servicesProviders = [
  { provide: IApiService, useClass: ApiService },
  { provide: IAuthService, useClass: AuthService },
  { provide: IConfigService, useClass: ConfigService },
  { provide: IUserService, useClass: UserService },
]
