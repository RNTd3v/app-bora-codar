import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '@cms/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IRoleService } from '../../services';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit, OnDestroy {

  formRole: FormGroup;

  isLoadingPage = true;
  isLoadingAction = false;

  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IRoleService,
  ) { }

  ngOnInit(): void {

    this.createFormRole();

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
        this.createRole()
          .pipe(finalize(() => (this.isLoadingAction = false)))
          .subscribe({ next: (role: Role) => this.handleResult(role) })
      );

    }

  }

  get formInvalid(): boolean {
    return this.formRole.invalid;
  }

  private createRole(): Observable<Role> {
    return this.service.createRole(this.formRole.value);
  }

  private createFormRole(): void {
    this.formRole = this.formBuilder.group({
      name: ['', [Validators.required]],
      admin: [false]
    });
  }

  private handleResult(_: Role): void {
    this.closeModal.emit(true);
    this.snackBar.open('Perfil criado com sucesso!', null, { duration: 1000 });
  }

}
