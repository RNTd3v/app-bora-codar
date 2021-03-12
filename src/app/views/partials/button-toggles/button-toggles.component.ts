import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonToggles } from '@cms/core';

@Component({
  selector: 'cms-button-toggles',
  templateUrl: './button-toggles.component.html',
  styleUrls: ['./button-toggles.component.scss']
})
export class ButtonTogglesComponent implements OnInit {

  @Input()
  buttonToggles = [] as ButtonToggles[];

  @Output()
  change = new EventEmitter<string | boolean>();

  constructor() { }

  ngOnInit(): void {}

  handleChange(event): void {
    this.change.emit(event);
  }

}
