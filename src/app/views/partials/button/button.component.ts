import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonConfig, IUIStateService, UIState } from '@cms/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cms-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  button: ButtonConfig = null;

  @Input()
  iconLeftName: string = null;

  @Input()
  iconRightName: string = null;

  @Input()
  isLoadingAction = false;

  @Input()
  disableButton = null;

  @Input()
  buttonClasses = '';

  @Input()
  matTooltip = '';

  @Input()
  type = 'button';

  @Input()
  size = '1.5rem'

  @Output()
  clickButtonEvent = new EventEmitter();

  constructor(private uiStateService: IUIStateService) { }

  ngOnInit(): void {}

  handleClick(): void {
    this.clickButtonEvent.emit(this.button);
  }

  get showSpinner(): Observable<boolean> {
    return this.uiStateService.isLoadingAction$ || of(this.isLoadingAction);
  }

  get showLeftIcon(): boolean {
    return !!this.button.iconLeftName;
  }

  get showRightIcon(): boolean {
    return !!this.button.iconRightName;
  }


}
