import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, Role } from '@cms/core'
import { Observable, Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { IRoleService, IUserService } from '../../services'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy, OnChanges {

  formUser: FormGroup;
  formGroupConfirmPass: FormGroup;

  isLoadingPage = true;
  isLoadingAction = false;

  allRoles: Role[] = [];
  rolesNames: string[] = [];

  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private roleService: IRoleService,
    private service: IUserService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formGroupConfirmPass)
  }

  async ngOnInit(): Promise<void> {

    this.createFormUser();

    this.allRoles = await this.getRoles();

    this.isLoadingPage = false;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getErrorMessage(inputName: string) {

    if (this.formUser.get(inputName).hasError('required')) {
      return 'Campo obrigatório'
    }

    switch (inputName) {
      case 'email':
        return this.formUser.get(inputName).hasError('email') ? 'E-mail invalido' : '';
      default:
        return
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formUser.get(inputName).invalid
  }

  submitUserData(): void {

    console.log(this);

    // if (this.formUser.valid) {

    //   this.isLoadingAction = true;

    //   this.subscription.add(
    //     this.createUser()
    //       .pipe(finalize(() => (this.isLoadingAction = false)))
    //       .subscribe((user: User) => this.handleResult(user))
    //   );

    // }

  }

  cancel(): void {
    this.closeModal.emit(false);
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

  getPassword(password: string): void {
    this.formUser.get('password').setValue(password);
  }

  private async getRoles(): Promise<Role[]> {
    return await this.roleService.getAllRoles().toPromise();
  }

  private createFormUser(): void {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleIds: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  private createUser(): Observable<User> {
    return this.service.createUser(this.formUser.value)
  }

  private handleResult(_: User): void {
    this.closeModal.emit(true);
    this.snackBar.open('Usuário criado com sucesso!', null, { duration: 1000 })
  }

  get formInvalid(): boolean {
    return this.formUser.invalid
  }

}

