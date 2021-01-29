import { Component, ComponentFactoryResolver, ComponentRef, HostListener, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@cms/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  @ViewChild('target', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    if (this.hasComponent) {
      this.createDynamicComponent();
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

  @HostListener('keydown.esc')
  onEsc() {
    this.close(false);
  }

  private createDynamicComponent(): void {

    const { component, componentData} = this.data;
    const factory = this.resolver.resolveComponentFactory(component);

    this.viewContainerRef.clear();

    const dynamicComponent = this.viewContainerRef.createComponent(factory).instance as any;

    this.addComponentData(dynamicComponent, componentData);
    this.listenerCloseModal(dynamicComponent);

  }

  private addComponentData(dynamicComponent, componentData): void {
    dynamicComponent.componentData = componentData;
  }

  private listenerCloseModal(dynamicComponent): void {
    dynamicComponent.closeModal.subscribe((value: boolean) => this.close(value));
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
