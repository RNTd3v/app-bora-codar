import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormConfig, User } from '@cms/core';
import { environment } from '@cms/environment';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../state/users.reducer';
import { userFormConfig } from './config/user-detail-form-config';
import * as UserActions from '../../state/users.actions';
import { ActivatedRoute } from '@angular/router';
import { getCurrentUser } from '../../state/users.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  formConfig: FormConfig;
  user$: Observable<User>;

  private subscription = new Subscription();

  constructor(private store: Store<State>, private route: ActivatedRoute) {

    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.store.dispatch(UserActions.loadUser({ userId }));
    }
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getCurrentUser);
    this.subscription.add(this.user$.subscribe(user => this.formConfig = userFormConfig(user)))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  saveUser(user: User): void {
    this.store.dispatch(UserActions.updateUser({ user }));
  }

}
