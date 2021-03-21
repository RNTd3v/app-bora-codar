import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormConfig, UserChangePassword } from '@cms/core';
import { userChangePassFormConfig } from '../config/user-change-pass-form-config';

@Component({
  selector: 'cms-user-changepass-form',
  templateUrl: './user-changepass-form.component.html',
  styleUrls: ['./user-changepass-form.component.scss']
})
export class UserChangepassFormComponent implements OnInit {

  formConfig: FormConfig;

  @Output()
  submit = new EventEmitter<UserChangePassword>();

  constructor() {
    this.formConfig = userChangePassFormConfig();
  }

  ngOnInit(): void {
  }

  getPassword(password: string): void {

    console.log(this.formConfig);


    if (password) {

      const fields = this.formConfig.fields;
      const newPasswordField = fields.filter(field => field.name !== 'password');

      newPasswordField.forEach(field => field.value = password);

      this.formConfig = {
        ...this.formConfig,
        fields
      }

    }

  }

  submitPass(userChangePass: UserChangePassword) : void {
    this.submit.emit(userChangePass);
  }

}
