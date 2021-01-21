import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Role, IRoleService } from '@cms/core';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {

  hide = true
  formRole: FormGroup
  roleId: string = null
  roleData: Role
  isLoading = false;
  isLoadingPage = true;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IRoleService,
  ) {
    this.roleId = this.activatedRoute.snapshot.params.id
  }

  async ngOnInit(): Promise<void> {

    if (!!this.roleId) {
      await this.getRoleById();
    }
    this.isLoadingPage = false;
    this.createFormRole(new Role(this.roleData))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async getRoleById(): Promise<void> {
    this.roleData = await this.service.getRole(this.roleId).toPromise();
  }

  private createFormRole(role: Role): void {
    this.formRole = this.formBuilder.group({
      name: [role.name, [Validators.required]],
      admin: [role.admin, [Validators.requiredTrue]],
      id: [role.id],
    })
  }

  getErrorMessage(inputName: string) {
    if (this.formRole.get(inputName).hasError('required')) {
      return 'Campo obrigatório'
    }

    switch (inputName) {
      case 'email':
        return this.formRole.get(inputName).hasError('email')
          ? 'E-mail invalido'
          : ''
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formRole.get(inputName).invalid
  }

  goBack(): void {
    this.router.navigate(['/user-management/roles'])
  }

  submitRoleData(): void {
    if (this.formRole.valid) {
      this.isLoading = true
      this.subscription.add(
        this.createOrUpdateRoleData()
          .pipe(
            finalize(() => (this.isLoading = false))
          )
          .subscribe(
            (role: Role) => this.handleResult(role),
            (err) => this.handleError(err),
          )
      );
    }
  }

  private createOrUpdateRoleData(): Observable<Role> {
    if (!!this.roleData) {
      return this.updateRoleData()
    }

    return this.createRole()
  }

  private createRole(): Observable<Role> {
    const formValue = this.formRole.value
    const { password } = formValue.passwordForm

    const payload = {
      ...formValue,
      password,
    }

    delete payload.passwordForm

    return this.service.createRole(payload)
  }

  private updateRoleData(): Observable<Role> {
    const payload = this.formRole.value
    return this.service.updateRole(payload, this.roleId)
  }

  private handleResult(role: Role): void {
    this.snackBar.open('Perfil salvo com sucesso!', null, {
      duration: 2000,
    })
  }

  private handleError(err): void {
    this.snackBar.open('Houve um erro!', null, {
      duration: 2000,
    })
  }

  get formInvalid(): boolean {
    return this.formRole.invalid
  }

  get title(): string {
    return !!this.roleData ? this.roleData.name : 'Perfil'
  }
}

