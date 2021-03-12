import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, of } from 'rxjs'
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators'
import { IUserService } from '../services/user/user.service.interface'
import * as UserActions from './users.actions'

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private service: IUserService, private router: Router) {}

  paginateUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.paginateUsersRequested),
      mergeMap(() =>
        this.service
          .paginateUsers()
          .pipe(
            map((users) => UserActions.paginateUsersSucceeded({ users }),
            catchError(error => EMPTY )
          )
        ),
      ),
    )
  });

  showUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.showUserRequested),
      mergeMap((action) =>
        this.service
          .showUser(action.userId)
          .pipe(
            map((user) => UserActions.showUserSucceeded({ user }),
            catchError(error => EMPTY )
        )),
      ),
    )
  });

  redirectAfterShowUserSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.showUserSucceeded),
      tap(({ user }) => {
        this.router.navigate([`admin/user-management/user-detail/${user.id}`]);
      })
    ),
    { dispatch: false }
  )

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserRequested),
      concatMap((action) =>
        this.service
          .updateUser(action.user, action.user.id)
          .pipe(
            map(() => UserActions.updateUserSucceeded(),
            catchError(error => EMPTY )
        )),
      ),
    )
  })
}
