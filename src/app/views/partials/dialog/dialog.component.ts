import { Component, ComponentFactoryResolver, ComponentRef, HostListener, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@cms/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    if (this.hasComponent) {
      const { component, componentData} = this.data;
      const factory = this.resolver.resolveComponentFactory(component);
      this.vcRef.clear();
      const dyynamicComponent = <any>this.vcRef.createComponent(factory).instance;
      dyynamicComponent.componentData = componentData;
      // dyynamicComponent.onCheckedChange.subscribe(msg => console.log(msg));
      console.log(dyynamicComponent);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  cancel() {
    this.close(false);
  }

  confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }

  private close(value) {
    this.dialogRef.close(value);
  }

  get cancelText(): string {
    return this.data.cancelText ? this.data.cancelText : 'Cancelar';
  }

  get confirmText(): string {
    return this.data.confirmText ? this.data.confirmText : 'Confirmar';
  }

  private get hasComponent(): boolean {
    return this.data.component;
  }

  get hasntComponent(): boolean {
    return !this.hasComponent;
  }

}
