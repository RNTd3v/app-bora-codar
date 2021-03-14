import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, Role } from '@cms/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IRoleService, IUserService } from '../../services';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.scss']
})
export class UpdateUserDataComponent implements OnInit, OnDestroy {

  formUser: FormGroup;

  userData = {} as User;
  changedTheAvatar = false;

  isLoadingPage = true;
  isLoadingAction = false;

  allRoles: Role[] = [];
  rolesNames: string[] = [];

  @Input() componentData;
  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private roleService: IRoleService,
    private service: IUserService,
  ) {}

  async ngOnInit(): Promise<void> {

    this.handleRoles();

    this.createFormUser(new User(this.userData));

    this.allRoles = await this.getRoles();

    this.isLoadingPage = false;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getErrorMessage(inputName: string) {

    if (this.formUser.get(inputName).hasError('required')) {
      return 'Campo obrigatório';
    }

    switch (inputName) {
      case 'email':
        return this.formUser.get(inputName).hasError('email') ? 'E-mail invalido' : '';
      default:
        return;
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formUser.get(inputName).invalid;
  }

  submitUserData(): void {

    if (this.formUser.valid) {

      this.isLoadingAction = true;

      this.subscription.add(
        this.updateUserData()
          .pipe(finalize(() => (this.isLoadingAction = false)))
          .subscribe((user: User) => this.handleResult(user))
      );

    }

  }

  cancel(): void {
    this.closeModal.emit(this.changedTheAvatar);
  }

  addRoleId(roleName: string): void {

    const roleId = this.allRoles
      .filter(role => role.name === roleName)
      .map(role => role.id);

    const roleIds = this.formUser.get('roleIds').value;

    this.formUser.get('roleIds').setValue([...(roleIds ? roleIds : ''), ...roleId]);

  }

  removeRoleId(index: number): void {

    const roleIds = this.formUser.get('roleIds').value as string[];
    roleIds.splice(index, 1);

    this.formUser.get('roleIds').setValue([...roleIds]);

  }

  uploadedTheAvatarFile(): void {
    this.changedTheAvatar = true;
  }

  private async getRoles(): Promise<Role[]> {
    return await this.roleService.paginateRoles().toPromise();
  }

  private handleRoles(): void {

    const roleIds = this.componentData.roles.map(role => role.id);

    this.rolesNames = this.componentData.roles.map(role => role.name);

    this.userData = {
      ...this.componentData,
      roleIds
    };

  }

  private createFormUser(user: User): void {
    this.formUser = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      isActive: [user.isActive],
      roleIds: [user.roleIds, [Validators.required]]
    });
  }

  private updateUserData(): Observable<User> {
    return this.service.updateUser(this.formUser.value, this.componentData.id);
  }

  private handleResult(_: User): void {
    this.closeModal.emit(true);
    this.snackBar.open('Usuário atualizado com sucesso!', null, { duration: 1000 });
  }

  get formInvalid(): boolean {
    return this.formUser.invalid;
  }

}

