import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { IRoleService } from '../../services/role/role.service.interface';
import * as RoleActions from './roles.actions';

@Injectable()
export class RoleEffects {

  constructor(
    private actions$: Actions,
    private service: IRoleService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  /**
   * Effects paginate role
   */

  paginateRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.paginateRolesRequested),
      mergeMap(() =>
        this.service
          .paginateRoles()
          .pipe(
            map((roles) => RoleActions.paginateRolesSucceeded({ roles })),
            catchError(error => of(RoleActions.paginateRolesFailed({ error })))
        ),
      ),
    )
  });

  showMessageAfterPaginateRolesFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.paginateRolesFailed),
      tap(() => this.showMessage('Oopss! Houve um erro para obter os perfis'))
    ),
    { dispatch: false }
  )

  /**
   * Effects show role
   */

  showRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.showRoleRequested),
      mergeMap((action) =>
        this.service
          .showRole(action.roleId)
          .pipe(
            map((role) => RoleActions.showRoleSucceeded({ role })),
            catchError(error => of(RoleActions.showRoleFailed({ error })) )
        ),
      ),
    )
  });

  showMessageAfterShowRoleFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.showRoleFailed),
      tap(() => this.showMessage('Oopss! Houve um erro para obter dados do perfil'))
    ),
    { dispatch: false }
  )

  /**
   * Effects create role
   */

   createRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.createRoleRequested),
      concatMap((action) =>
        this.service
          .createRole(action.role)
          .pipe(
            map(({ id }) => RoleActions.createRoleSucceeded({ roleId: id })),
            catchError(error => of(RoleActions.createRoleFailed({ error })) )
        ),
      ),
    )
  })

  showMessageAfterCreateRoleSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.createRoleSucceeded),
      tap(() => this.showMessage('Perfil criado com sucesso, agora selecione as permiss??es', 5000))
    ),
    { dispatch: false }
  )

  showMessageAfterCreateRoleFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.createRoleFailed),
      tap(() => this.showMessage('Houve um erro na cria????o do perfil'))
    ),
    { dispatch: false }
  )

  /**
   * Effects update role
   */

  updateRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.updateRoleRequested),
      concatMap((action) =>
        this.service
          .updateRole(action.role, action.roleId)
          .pipe(
            map(() => RoleActions.updateRoleSucceeded({ roleId: action.roleId, linkMenus: action.linkMenus })),
            catchError(error => of(RoleActions.updateRoleFailed({ error })) )
        ),
      ),
    )
  })

  linkMenusAfterUpdateRoleSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.updateRoleSucceeded),
      map((action) => RoleActions.linkRoleWithMenusRequested({ linkMenus: action.linkMenus, roleId: action.roleId }))
    )
  })

  showMessageAfterUpdateRoleFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.updateRoleFailed),
      tap(() => this.showMessage('Houve um erro na atualiza????o do perfil'))
    ),
    { dispatch: false }
  )

   /**
   * Effects delete role
   */

    deleteRole$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RoleActions.deleteRoleRequested),
        concatMap((action) =>
          this.service
            .deleteRole(action.roleId)
            .pipe(
              map(() => RoleActions.deleteRoleSucceeded({ roleId: action.roleId })),
              catchError(error => of(RoleActions.deleteRoleFailed({ error })))
          ),
        ),
      )
    })

    showMessageAfterDeleteRoleSuccess$ = createEffect(
      () => this.actions$.pipe(
        ofType(RoleActions.deleteRoleSucceeded),
        tap(() => this.showMessage('Perfil deletado com sucesso'))
      ),
      { dispatch: false }
    )

    showMessageAfterDeleteRoleFail$ = createEffect(
      () => this.actions$.pipe(
        ofType(RoleActions.deleteRoleFailed),
        tap(() => this.showMessage('Oopss!! N??o foi poss??vel deletar o perfil! Tente novamente mais tarde!', 3000))
      ),
      { dispatch: false }
    )

  /**
   * Menus show by role
   */

   menuShowByRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.menuShowByRoleRequested),
      concatMap((action) =>
        this.service
          .menuShowByRole(action.roleId)
          .pipe(
            map((menus) => RoleActions.menuShowByRoleSucceeded({ roleMenus: menus })),
            catchError(error => of(RoleActions.menuShowByRoleFailed({ error })))
        ),
      ),
    )
  })

  showMessageAfterMenuShowByRoleFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.menuShowByRoleFailed),
      tap(() => this.showMessage('Oopss!! N??o foi poss??vel obter a lista de permiss??es deste perfil', 3000))
    ),
    { dispatch: false }
  )

  /**
   * Effects link role with menus
   */

  linkRoleWithMenus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.linkRoleWithMenusRequested),
      concatMap((action) =>
        this.service
          .linkRoleWithMenu(action.linkMenus, action.roleId)
          .pipe(
            map(() => RoleActions.linkRoleWithMenusSucceeded()),
            catchError(error => of(RoleActions.linkRoleWithMenusFailed({ error })))
        ),
      ),
    )
  })

  showMessageAfterLinkRoleWithMenusSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.linkRoleWithMenusSucceeded),
      tap(() => this.showMessage('Link com o menu realizado com sucesso!'))
    ),
    { dispatch: false }
  )

  showMessageAfterLinkRoleWithMenusFail$ = createEffect(
    () => this.actions$.pipe(
      ofType(RoleActions.linkRoleWithMenusFailed),
      tap(() => this.showMessage('Oopss!! N??o foi poss??vel linkar o menu! Tente novamente mais tarde!', 3000))
    ),
    { dispatch: false }
  )

  private showMessage(message: string, duration = 2000): void {
    this.snackBar.open(message, null, { duration });
  }
}
