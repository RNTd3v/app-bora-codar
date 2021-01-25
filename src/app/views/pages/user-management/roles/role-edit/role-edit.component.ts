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
  roleData = { name: '', admin: false } as Role;
  isLoading = false;
  isLoadingPage = true;
  editMode = false;

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
      this.editMode = true;
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
      admin: [role.admin]
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
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({ next: (role: Role) => this.handleResult(role) })
      );
    }
  }

  private createOrUpdateRoleData(): Observable<Role> {
    if (this.editMode) {
      return this.updateRoleData()
    }

    return this.createRole()
  }

  private createRole(): Observable<Role> {
    return this.service.createRole(this.formRole.value);
  }

  private updateRoleData(): Observable<Role> {
    return this.service.updateRole(this.formRole.value, this.roleId)
  }

  private handleResult(_: Role): void {
    this.showSnackBar('Perfil salvo com sucesso!');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, null, { duration: 2000});
  }

  get formInvalid(): boolean {
    return this.formRole.invalid;
  }

  get title(): string {
    return this.editMode ? this.roleData.name : 'Perfil';
  }
}

