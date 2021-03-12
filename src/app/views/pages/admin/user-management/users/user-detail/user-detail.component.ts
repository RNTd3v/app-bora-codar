import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormConfig, User } from '@cms/core';
import { environment } from '@cms/environment';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../state/users.reducer';
import { userFormConfig } from './config/user-detail-form-config';
import * as UserActions from '../../state/users.actions';
import { ActivatedRoute } from '@angular/router';
import { showUser } from '../../state/users.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  formConfig: FormConfig;
  user: User;
  userId: string;

  private subscription = new Subscription();

  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.subscription.add(
      this.store.select(showUser).subscribe(user => {

        if (!!user) {
          this.user = user;
          this.formConfig = userFormConfig(user)
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
