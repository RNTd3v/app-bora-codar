import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPaginationService, Role, User } from '@cms/core';
import { environment } from '@cms/environment';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../state/users/users.reducer';
import * as UserActions from '../../state/users/users.actions';
import * as RoleActions from '../../state/roles/roles.actions';
import { showUser } from '../../state/users/users.selectors';
import { paginateRoles } from '../../state/roles/roles.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: User;
  userId: string;

  roles$!: Observable<Role[]>;

  private subscription = new Subscription();

  constructor(private store: Store<State>, private route: ActivatedRoute, private config: IPaginationService) {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.config.queryParams = { ...this.config.queryParams, perPage: 50 };
    this.roles$ = this.store.select(paginateRoles);
  }

  ngOnInit(): void {
    this.getUser();
    this.getRoles();
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

  saveUser(user: User): void {
    console.log(user);
    console.log(this.userId);


    this.store.dispatch(UserActions.updateUserRequested({ user, userId: this.userId }));
  }

}
