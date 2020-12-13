import { IApiService, IConfigService, IUserService } from ".";
import { ApiService } from "./api/api.service";
import { ConfigService } from "./config/config.service";
import { UserService } from "./user/user.service";

export let servicesProviders = [
  { provide: IApiService, useClass: ApiService },
  { provide: IConfigService, useClass: ConfigService },
  { provide: IUserService, useClass: UserService },
]
