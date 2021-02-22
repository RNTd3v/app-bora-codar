import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'cms-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  openMenu: Observable<boolean>;

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.openMenu = this.store.select('theme')
      .pipe(map(item => item.openMenu));
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}
