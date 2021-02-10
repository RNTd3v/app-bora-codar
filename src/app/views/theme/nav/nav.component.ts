import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() asideIsClosed = false;

  constructor() { }

  ngOnInit(): void {
  }

  get iconSize(): string {
    return this.asideIsClosed ? '2rem' : '1.2rem';
  }

}
