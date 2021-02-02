import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '@cms/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IRoleService } from '../../services';

@Component({
  selector: 'app-update-role-data',
  templateUrl: './update-role-data.component.html',
  styleUrls: ['./update-role-data.component.scss']
})
export class UpdateRoleDataComponent implements OnInit, OnDestroy {

  formRole: FormGroup;
  roleData = {} as Role;
  isLoadingPage = true;
  isLoadingAction = false;

  @Input() componentData;
  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IRoleService,
  ) { }

  ngOnInit(): void {

    this.roleData = this.componentData;

    this.createFormRole(new Role(this.roleData));

    this.isLoadingPage = false;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cancel(): void {
    this.closeModal.emit(false);
  }

  getErrorMessage(inputName: string) {
    if (this.formRole.get(inputName).hasError('required')) {
      return 'Campo obrigatório';
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formRole.get(inputName).invalid;
  }

  submitRoleData(): void {

    if (this.formRole.valid) {

      this.isLoadingAction = true;

      this.subscription.add(
        this.updateRoleData()
          .pipe(finalize(() => (this.isLoadingAction = false)))
          .subscribe({ next: (role: Role) => this.handleResult(role) })
      );

    }

  }

  get formInvalid(): boolean {
    return this.formRole.invalid;
  }

  private updateRoleData(): Observable<Role> {
    return this.service.updateRole(this.formRole.value, this.roleData.id);
  }

  private createFormRole(role: Role): void {
    this.formRole = this.formBuilder.group({
      name: [role.name, [Validators.required]],
      admin: [role.admin]
    });
  }

  private handleResult(_: Role): void {
    this.closeModal.emit(true);
    this.snackBar.open('Perfil atualizado com sucesso!', null, { duration: 1000 });
  }

}
