import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '@cms/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms';
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading.pipe(debounceTime(0));
  }
}
