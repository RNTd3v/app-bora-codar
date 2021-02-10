import { Injectable } from '@angular/core';
import { IAsideService } from '..';

@Injectable({
  providedIn: 'root'
})
export class AsideService implements IAsideService {

  private asideClosed = false;

  readonly widthAsideClosed = '8rem';
  readonly widthAsideOpened = '30rem';

  constructor() { }

  toggleAside(): void {
    this.asideClosed = !this.asideClosed;
    document.documentElement.style.setProperty('--width-aside', `${this.asideIsClosed ? this.widthAsideClosed : this.widthAsideOpened}`);
  }

  get asideIsClosed(): boolean {
    return this.asideClosed;
  }

}
