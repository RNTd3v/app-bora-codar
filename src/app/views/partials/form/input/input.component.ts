import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '@cms/core';
import { MaskDirective } from 'src/app/shared/utils/directives/mask.directive';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  hidePassword = true;

  @Output() validatedField = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showMessageError(fieldName: string, validationName: string): boolean {
    const field = this.group.get(fieldName)
    return field.hasError(validationName);
  }

  log(value): void {
    console.log(value);
  }

}
