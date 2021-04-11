import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPaginationService, Role, User, UserChangePassword } from '@cms/core';
import { environment } from '@cms/environment';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../state/users/users.reducer';
import * as UserActions from '../../state/users/users.actions';
import * as RoleActions from '../../state/roles/roles.actions';
import { showUser } from '../../state/users/users.selectors';
import { paginateRoles } from '../../state/roles/roles.selectors';
import { IDialogService } from '@cms/partials';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: User;
  userId: string | undefined;

  roles$!: Observable<Role[]>;

  showUserDetailForm = true;

  private subscription = new Subscription();

  @ViewChild('userDetail') userDetail!: ElementRef;

  constructor(
    private dialogService: IDialogService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private config: IPaginationService) {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.config.queryParams = { ...this.config.queryParams, perPage: 50 };
    this.roles$ = this.store.select(paginateRoles);
  }

  ngOnInit(): void {
    this.setUser();
    this.getRoles();
  }

  private setUser(): void {

    if (this.userId) {
      this.getUser();
      return
    }

    this.newUser();

  }

  private getUser(): void {
    this.subscription.add(
      this.store.select(showUser).subscribe(user => {

        if (!!user) {
          this.user = user;
          return
        }

        this.store.dispatch(UserActions.showUserRequested({ userId: this.userId }));

      })
    );
  }

  private newUser(): void {
    this.user = {
      name: '',
      email: '',
      isActive: false,
      roles: []
    } as User
  }

  private getRoles(): void {
    this.store.dispatch(RoleActions.paginateRolesRequested());
  }

  ngOnDestroy(): void {
    this.config.applyDefaultValues();
    this.subscription.unsubscribe();
  }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  submitUser(user: User): void {
    this.userId ?
    this.store.dispatch(UserActions.updateUserRequested({ user, userId: this.userId })) :
    this.store.dispatch(UserActions.createUserRequested({ user }))
  }

  submitPass(userChangePass: UserChangePassword) : void {
    console.log(userChangePass);
  }

  showDetailForm(): void {
    this.showUserDetailForm = true;
  }

  showChangePassForm(): void {
    this.userDetail.nativeElement.scroll({ top: 0, behavior: 'smooth' });
    this.showUserDetailForm = false;
  }

  async openDialogToDeleteUser(): Promise<void> {

    const wasItConfirmed = await this.dialogService.openDialog({
      title: 'Deletar usuário',
      text: `Tem certeza que deseja excluir este usuário?`
    });

    if (wasItConfirmed) {
      this.store.dispatch(UserActions.deleteUserRequested({ userId: this.userId }));
    }


  }

}
