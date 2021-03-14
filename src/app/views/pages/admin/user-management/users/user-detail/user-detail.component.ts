import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Role, User } from '@cms/core';
import { environment } from '@cms/environment';
import { Subscription } from 'rxjs';
import { State } from '../../state/users/users.reducer';
import * as UserActions from '../../state/users/users.actions';
import { showUser } from '../../state/users/users.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: User;
  userId: string;

  roles: Role[] = [];

  private subscription = new Subscription();

  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUser();
    // get roles

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  saveUser(user: User): void {
    this.store.dispatch(UserActions.updateUserRequested({ user, userId: this.userId }));
  }

}
