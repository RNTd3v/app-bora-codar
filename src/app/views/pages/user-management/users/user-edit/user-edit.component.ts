import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, ActivatedRoute } from '@angular/router'
import { User, ConfirmedValidator, Role } from '@cms/core'
import { Observable, Subscription } from 'rxjs'
import { finalize, map, startWith } from 'rxjs/operators'
import { IRoleService, IUserService } from '../../services'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {

  hide = true;
  formUser: FormGroup;

  userId: string = null;
  userData = { name: '', email: '', isActive: false, roleIds: [] } as User;

  isLoading = false;
  isLoadingPage = true;
  editMode = false;

  rolesNames: string[] = [];
  rolesIds: string[] = [];
  allRoles: Role[] = [];
  roleControl = new FormControl();
  filteredRolesOptions: Observable<Role[]>;
  selectableRole = true;
  removableRole = true;
  separatorKeysCodesRoles: number[] = [ENTER, COMMA];
  textInputRole = 'Add perfil ...';

  @Input('componentData') componentData;
  @Output()
  closeModal = new EventEmitter<any>();

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private roleService: IRoleService,
    private service: IUserService,
  ) {
    this.userId = this.activatedRoute.snapshot.params.id
  }

  async ngOnInit(): Promise<void> {

    this.editMode = true;
    this.fillFormData();

    this.isLoadingPage = false;

    this.createFormUser(new User(this.userData));

    this.allRoles = await this.getRoles();

    this.setFilterRolesOptions();

    this.handleWhenAllRolesAreAdded();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addRoleChip(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.rolesNames.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.roleControl.setValue(null);

  }

  removeRoleChip(role: string): void {

    const index = this.rolesNames.indexOf(role);

    if (index >= 0) {
      this.removeRole(index);
    }

    this.enabledInputAutoComplete();

  }

  selectedRole(event: MatAutocompleteSelectedEvent): void {

    const roleName = event.option.viewValue;

    if (!this.roleAlreadyAdded(roleName)) {
      this.addRole(roleName);
    }

    this.handleWhenAllRolesAreAdded();
    this.resetRoleControl();

  }

  getErrorMessage(inputName: string) {

    if (this.formUser.get(inputName).hasError('required')) {
      return 'Campo obrigatório'
    }

    switch (inputName) {
      case 'email':
        return this.formUser.get(inputName).hasError('email') ? 'E-mail invalido' : '';
      // case 'password':
      //   return this.formUser.get(inputName).hasError('minlength')
      //     ? 'Mínimo de 6 caracteres'
      //     : ''
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formUser.get(inputName).invalid
  }

  goBack(): void {
    this.router.navigate(['/user-management/users'])
  }

  submitUserData(): void {

    if (this.formUser.valid) {

      this.isLoading = true;

      this.subscription.add(
        this.createOrUpdateUserData()
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe((user: User) => this.handleResult(user))
      );

    }

  }

  cancel(): void {
    this.closeModal.emit(false);
  }

  private async getRoles(): Promise<Role[]> {
    return await this.roleService.getAllRoles().toPromise();
  }

  private fillFormData(): void {

    const roleIds = this.componentData.roles.map(role => role.id);

    this.rolesNames = this.componentData.roles.map(role => role.name);

    this.userData = {
      ...this.componentData,
      roleIds
    }

  }

  private createFormUser(user: User): void {
    this.formUser = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      isActive: [user.isActive],
      roleIds: [user.roleIds, [Validators.required]]
      // passwordForm: this.formBuilder.group(
      //   {
      //     password: [
      //       '',
      //       [Validators.required, Validators.minLength(6)],
      //     ],
      //     confirm: [
      //       '',
      //       [Validators.required, Validators.minLength(6)],
      //     ],
      //   },
      //   {
      //     validator: ConfirmedValidator('password', 'confirm'),
      //   },
      // ),

    })
  }

  private createOrUpdateUserData(): Observable<User> {
    if (this.editMode) {
      return this.updateUserData()
    }

    return this.createUser()
  }

  private createUser(): Observable<User> {
    return this.service.createUser(this.formUser.value);
  }

  private updateUserData(): Observable<User> {
    return this.service.updateUser(this.formUser.value, this.componentData.id)
  }

  private handleResult(_: User): void {
    // this.router.navigate(['/user-management']);
    this.closeModal.emit(true);
    this.snackBar.open('Usuário salvo com sucesso!', null, { duration: 2000 })
  }

  private setFilterRolesOptions(): void {
    this.filteredRolesOptions = this.roleControl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filter(name) : this.allRoles.slice())
      );
  }

  private filter(name: string): Role[] {
    const filterValue = name.toLowerCase();
    return this.allRoles.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private addRole(roleName: string): void {

    this.rolesNames.push(roleName);

    const roleId = this.allRoles
      .filter(role => role.name === roleName)
      .map(role => role.id);

    const roleIds = this.formUser.get('roleIds').value;

    this.formUser.get('roleIds').setValue([...(roleIds ? roleIds : ''), ...roleId]);

  }

  private removeRole(index: number): void {

    this.rolesNames.splice(index, 1);

    const roleIds = this.formUser.get('roleIds').value as string[];
    roleIds.splice(index, 1);

    this.formUser.get('roleIds').setValue([...roleIds]);

  }

  private resetRoleControl(): void {
    this.roleInput.nativeElement.value = '';
    this.roleControl.setValue(null);
  }

  private disabledInputAutoComplete(): void {
    this.roleControl.disable();
    this.textInputRole = '';
  }

  private enabledInputAutoComplete(): void {
    this.textInputRole = 'Add perfil ...';
    this.roleControl.enable();
  }

  private handleWhenAllRolesAreAdded(): void {

    if (this.allRoles.length === this.rolesNames.length) {
      this.disabledInputAutoComplete();
      return
    };

    this.enabledInputAutoComplete();
  }

  private roleAlreadyAdded(roleName: string): boolean {
    return this.rolesNames.some(role => role === roleName);
  }

  get formInvalid(): boolean {
    return this.formUser.invalid
  }

  get title(): string {
    return !!this.userData ? this.userData.name : 'Usuário'
  }
}

