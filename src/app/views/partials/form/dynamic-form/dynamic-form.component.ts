import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonConfig, FieldConfig, FormConfig } from '@cms/core';

@Component({
  selector: 'cms-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formConfig = {} as FormConfig;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @Output() clickButton: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createControl();
    this.form.statusChanges.subscribe(status => this.disableButton(status === 'INVALID'));
  }

  onSubmit(event: Event) {

    event.preventDefault();
    event.stopPropagation();

    if (this.form.valid) {
      this.submit.emit(this.form.value);
      return;
    }

    this.validateAllFormFields(this.form);

  }

  onClick(button: ButtonConfig) {
    this.clickButton.emit(button);
  }

  private createControl(): FormGroup {

    const group = this.formBuilder.group({});
    const { fields } = this.formConfig as FormConfig;

    fields.forEach(field => {

      if (field.type === "button") {
        return;
      };

      const control = this.formBuilder.control(field.value, this.bindValidations(field.validations || []));

      group.addControl(field.name, control);

    });

    return group;

  }

  private bindValidations(validations: any): Validators | null {

    if (validations.length > 0) {

      const validList = [];

      validations.forEach(valid => validList.push(valid.validator));

      return Validators.compose(validList);

    }

    return null;

  }

  private validateAllFormFields(formGroup: FormGroup): void {

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });

  }

  private disableButton(statusForm: boolean): void {

    const { buttons } = this.formConfig as FormConfig;

    buttons.forEach(button => {
      if (button.type === 'submit') {
        button.disabled = statusForm;
      }
    })

    this.formConfig = {
      ...this.formConfig,
      buttons: [
        ...buttons
      ]
    }
  }

  get value() {
    return this.form.value;
  }

}
