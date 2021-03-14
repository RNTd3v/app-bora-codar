import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonConfig, FormConfig, LoaderService } from '@cms/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cms-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() formConfig = {} as FormConfig;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @Output() clickButton: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  isLoading$: Observable<boolean>;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService
    ) {
      this.isLoading$ = this.loaderService.isLoading.pipe(debounceTime(0));
    }

  ngOnInit(): void {
    this.form = this.createControl();
    this.handleDisableButton();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(!!changes && changes.hasOwnProperty('formConfig')) {
      this.form = this.createControl();
      this.disableButton(this.form.invalid);
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

      const control = field.validationArray ?
        this.formBuilder.array(field.value, this.bindValidations(field.validations || [])) :
        this.formBuilder.control(field.value, this.bindValidations(field.validations || []))

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

  private handleDisableButton(): void {
    this.disableButton(this.form.invalid);
    this.subscription.add(this.form.statusChanges.subscribe(status => this.disableButton(status === 'INVALID')));
    this.subscription.add(this.isLoading$.subscribe(status => this.disableButton(status)));
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
