import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  buttonText: string = null;

  @Input()
  iconLeftName: string = null;

  @Input()
  iconRightName: string = null;

  @Input()
  isLoadingAction = false;

  @Input()
  disableButton = false;

  @Input()
  buttonClasses = '';

  @Input()
  matTooltip = '';

  @Input()
  type = 'button';

  @Output()
  clickButtonEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  handleClick(): void {
    this.clickButtonEvent.emit();
  }

  get showLeftIcon(): boolean {
    return !!this.iconLeftName;
  }

  get showRightIcon(): boolean {
    return !!this.iconRightName;
  }

  get disabledButton(): boolean {
    return this.isLoadingAction || this.disableButton;
  }


}
