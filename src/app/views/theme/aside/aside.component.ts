import { Component, OnInit } from '@angular/core';
import { IAsideService } from '@cms/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(
    private service: IAsideService
  ) { }

  ngOnInit(): void {}

  toggleAside(): void {

  }

  get asideIsClosed(): boolean {
    return this.service.asideIsClosed;
  }

}
