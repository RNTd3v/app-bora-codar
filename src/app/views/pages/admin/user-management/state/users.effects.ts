import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '@cms/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators'
import { IUserService } from '../services/user/user.service.interface'
import * as UserActions from './users.actions'

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private service: IUserService, private router: Router) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.service
          .getAllUsers()
          .pipe(
            map((users) => UserActions.loadUsersSuccess({ users }),
            catchError(error => of(UserActions.loadUsersFailure({ error })
          )
        ))),
      ),
    )
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>
        this.service
          .getUser(action.userId)
          .pipe(
            map((user) => UserActions.loadUserSuccess({ user }),
            catchError(error => of(UserActions.loadUserFailure({ error })
          )
        ))),
      ),
    )
  });

  redirectAfterLoadUserSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.setCurrentUser),
      tap(({ currentUserId }) => {
        this.router.navigate([`admin/user-management/user-detail/${currentUserId}`]);
      })
    ),
    { dispatch: false }
  )

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) =>
        this.service
          .updateUser(action.user, action.user.id)
          .pipe(
            map((user) => UserActions.updateUserSuccess({ user }),
            catchError(error => of(UserActions.updateUserFailure({ error })
          )
        ))),
      ),
    )
  })
}
