import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getOpenMenuState, State } from '../state/app.reducer';
@Component({
  selector: 'cms-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  openMenu$: Observable<boolean>;

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    this.openMenu$ = this.store.select(getOpenMenuState);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}
