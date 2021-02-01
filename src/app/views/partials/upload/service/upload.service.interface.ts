import { Observable } from "rxjs";

export abstract class IUploadService {
  abstract saveUserAvatar(avatar: FormData, userID: string): Observable<void>;
}
