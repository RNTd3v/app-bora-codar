import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { IUserService } from '../../services/user/user.service.interface';
import * as UserActions from './users.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private service: IUserService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  /**
   * Effects paginate user
   */

  paginateUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.paginateUsersRequested),
      mergeMap(() =>
        this.service
          .paginateUsers()
          .pipe(
            map((users) => UserActions.paginateUsersSucceeded({ users })),
            catchError(error => of(UserActions.paginateUsersFailed({ error })))
        ),
      ),
    )
  });

  showMessageAfterPaginateUsersFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.paginateUsersFailed),
      tap(() => this.showMessage('Oopss! Houve um erro para obter os usuários'))
    ),
    { dispatch: false }
  )

  /**
   * Effects show user
   */

  showUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.showUserRequested),
      mergeMap((action) =>
        this.service
          .showUser(action.userId)
          .pipe(
            map((user) => UserActions.showUserSucceeded({ user })),
            catchError(error => of(UserActions.showUserFailed({ error })) )
        ),
      ),
    )
  });

  redirectAfterShowUserSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.showUserSucceeded),
      tap(({ user }) => this.router.navigate([`admin/user-management/user-detail/${user.id}`]))
    ),
    { dispatch: false }
  )

  showMessageAfterShowUserFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.showUserFailed),
      tap(() => this.showMessage('Oopss! Houve um erro para obter dados do usuário'))
    ),
    { dispatch: false }
  )

  /**
   * Effects create user
   */

   createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUserRequested),
      concatMap((action) =>
        this.service
          .createUser(action.user)
          .pipe(
            map(() => UserActions.createUserSucceeded()),
            catchError(error => of(UserActions.createUserFailed({ error })) )
        ),
      ),
    )
  })

  showMessageAfterCreateUserSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.createUserSucceeded),
      tap(() => this.showMessage('Usuário criado com sucesso'))
    ),
    { dispatch: false }
  )

  showMessageAfterCreateUserFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.createUserFailed),
      tap(() => this.showMessage('Houve um erro na criação do usuário'))
    ),
    { dispatch: false }
  )

  /**
   * Effects update user
   */

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserRequested),
      concatMap((action) =>
        this.service
          .updateUser(action.user, action.userId)
          .pipe(
            map((user) => UserActions.updateUserSucceeded({ user })),
            catchError(error => of(UserActions.updateUserFailed({ error })) )
        ),
      ),
    )
  })

  showMessageAfterUpdateUserSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.createUserSucceeded),
      tap(() => this.showMessage('Usuário atualizado com sucesso'))
    ),
    { dispatch: false }
  )

  showMessageAfterUpdateUserFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.createUserFailed),
      tap(() => this.showMessage('Houve um erro na atualização do usuário'))
    ),
    { dispatch: false }
  )

  /**
   * Effects update user password
   */

   updateUserPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserPasswordRequested),
      concatMap((action) =>
        this.service
          .updateUserPassword(action.data, action.userId)
          .pipe(
            map(() => UserActions.updateUserPasswordSucceeded()),
            catchError(error => of(UserActions.updateUserPasswordFailed({ error })) )
        ),
      ),
    )
  })

  showMessageAfterUpdateUserPasswordSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.updateUserPasswordSucceeded),
      tap(() => this.showMessage('A senha do usuário foi atualizada com sucesso'))
    ),
    { dispatch: false }
  )

  showMessageAfterUpdateUserPasswordFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.updateUserPasswordFailed),
      tap(() => this.showMessage('Houve um erro na alteração da senha do usuário'))
    ),
    { dispatch: false }
  )

  /**
   * Effects update user status
   */

   updateUserStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserStatusRequested),
      concatMap((action) =>
        this.service
          .updateUserStatus(action.data, action.userId)
          .pipe(
            map(() => UserActions.updateUserStatusSucceeded()),
            catchError(error => of(UserActions.updateUserStatusFailed({ error })) )
        ),
      ),
    )
  })

  showMessageAfterUpdateUserStatusSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.updateUserStatusSucceeded),
      tap(() => this.showMessage('O status do usuário foi atualizado com sucesso'))
    ),
    { dispatch: false }
  )

  paginateUsersAfterUpdateUserStatusSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.updateUserStatusSucceeded),
      tap(() => UserActions.paginateUsersRequested())
    ),
    { dispatch: true }
  )

  showMessageAfterUpdateUserStatusFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.updateUserStatusFailed),
      tap(() => this.showMessage('Houve um erro na alteração do status do usuário'))
    ),
    { dispatch: false }
  )

  //  /**
  //  * Effects update user avatar
  //  */

  //   updateUserAvatar$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(UserActions.updateUserAvatarRequested),
  //       concatMap((action) =>
  //         this.uploadService
  //           .saveUserAvatar(action.avatar, action.userId)
  //           .pipe(
  //             map(() => UserActions.updateUserAvatarSucceeded(),
  //             catchError(error => of(UserActions.updateUserAvatarFailed({ error })) )
  //         )),
  //       ),
  //     )
  //   })

  //   showMessageAfterUpdateUserAvatarSuccess$ = createEffect(
  //     () => this.actions$.pipe(
  //       ofType(UserActions.updateUserAvatarSucceeded),
  //       tap(() => this.showMessage('Avatar salvo com sucesso'))
  //     ),
  //     { dispatch: false }
  //   )

  //   showMessageAfterUpdateUserAvatarFail$ = createEffect(
  //     () => this.actions$.pipe(
  //       ofType(UserActions.updateUserAvatarFailed),
  //       tap(() => this.showMessage('Houve um erro para salvar o avatar do usuário'))
  //     ),
  //     { dispatch: false }
  //   )

   /**
   * Effects delete user
   */

    deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserRequested),
        concatMap((action) =>
          this.service
            .deleteUser(action.userId)
            .pipe(
              map(() => UserActions.deleteUserSucceeded()),
              catchError(error => of(UserActions.deleteUserFailed({ error })))
          ),
        ),
      )
    })

    showMessageAfterDeleteUserSuccess$ = createEffect(
      () => this.actions$.pipe(
        ofType(UserActions.deleteUserSucceeded),
        tap(() => this.showMessage('Usuário deletado com sucesso'))
      ),
      { dispatch: false }
    )

    paginateUsersAfterDeleteUserSuccess$ = createEffect(
      () => this.actions$.pipe(
        ofType(UserActions.deleteUserSucceeded),
        tap(() => UserActions.paginateUsersRequested())
      ),
      { dispatch: true }
    )

    showMessageAfterDeleteUserFail$ = createEffect(
      () => this.actions$.pipe(
        ofType(UserActions.deleteUserFailed),
        tap(() => this.showMessage('Oopss!! Não foi possível deletar o usuário! Tente novamente mais tarde!', 3000))
      ),
      { dispatch: false }
    )

    private showMessage(message: string, duration = 2000): void {
      this.snackBar.open(message, null, { duration });
    }
}
