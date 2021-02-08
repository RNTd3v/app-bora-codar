import { ComponentFactoryResolver, Directive, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ButtonConfig } from '@cms/core';
import { ButtonComponent } from '../../button/button.component';

@Directive({
  selector: '[dynamicButton]'
})
export class DynamicButtonDirective implements OnInit {

  @Input() button: ButtonConfig;

  @Output() clickButtonEvent = new EventEmitter();

  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(ButtonComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.button = this.button;
    this.componentRef.instance.clickButtonEvent
      .subscribe((button: ButtonConfig) => this.clickButtonEvent.emit(button));
  }

}
