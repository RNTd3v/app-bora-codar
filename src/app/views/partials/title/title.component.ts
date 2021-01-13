import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input()
  pageName: string;

  @Input()
  iconName: string = null;

  constructor() { }

  ngOnInit(): void {}

  get showIcon(): boolean {
    return !!this.iconName;
  }

}
