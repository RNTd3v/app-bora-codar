import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData, DialogTarget, IApiService, OptionsApi, UserStatus, User, UserChangePassword, UserDialogData, UserDialogTarget } from '@cms/core';
import { IDialogService } from '@cms/partials';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {

  private selectedUserSource = new BehaviorSubject<User | null>(null);
  selectedUserChanges$ = this.selectedUserSource.asObservable();

  constructor(
    private apiService: IApiService,
    private dialogService: IDialogService,
    private snackBar: MatSnackBar
    ) {}

    paginateUsers(): Observable<User[]> {
      const options = { itsAList: true } as OptionsApi;
      return this.apiService.getAll<User[]>('v1/users', options);
    }

    showUser(userID: string): Observable<User> {
      return this.apiService.get<User>(`v1/users/${userID}`);
    }

    createUser(user: User): Observable<User> {
      return this.apiService.post<User>(`v1/users`, user);
    }

    updateUser(user: User, userID: string): Observable<User> {
      return this.apiService.put<User>(`v1/users/${userID}`, user);
    }

    updateUserPassword(userPass: UserChangePassword, userID: string): Observable<void> {
      return this.apiService.put<void>(`v1/users/${userID}/password`, userPass);
    }

    updateUserStatus(status: UserStatus, userID: string): Observable<void> {
      return this.apiService.patch<void>(`v1/users/${userID}/active`, status);
    }

    deleteUser(userID: string): Observable<User> {
      return this.apiService.delete<User>(`v1/users/${userID}`);
    }

    async handleUserDialogs(dialogData: DialogData<any>, dialogTarget?: DialogTarget<UserDialogData, UserDialogTarget>): Promise<User[]> {

      const wasItConfirmed = await this.dialogService.openDialog(dialogData);

      if (wasItConfirmed) {

        if (!!dialogTarget) {
          await this.handleDialogTarget(dialogTarget);
        }

        return await this.paginateUsers().toPromise();
      }

      Promise.resolve(null);

    }

    private async handleDialogTarget(dialogTarget: DialogTarget<UserDialogData, UserDialogTarget>): Promise<any> {

      switch (dialogTarget.target) {

        case UserDialogTarget.delete:
          return await this.deleteUser(dialogTarget.data.id).toPromise()
            .then(_ => this.snackBar.open('Usuário excluido com sucesso!', null, { duration: 2000}));

        case UserDialogTarget.changeStatus:
          return await this.updateUserStatus(dialogTarget.data.status, dialogTarget.data.id).toPromise();

        default:
          break;
      }
    }


}
