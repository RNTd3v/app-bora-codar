import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '@cms/core';

@Component({
  selector: 'cms-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  @Output() validatedField = new EventEmitter();
  @ViewChild('inputCheckbox') inputCheckbox!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  changeValue(fieldName: string): void {
    this.group.get(fieldName).setValue(this.inputCheckbox.nativeElement.checked);
  }

  showMessageError(fieldName: string, validationName: string): boolean {
    const field = this.group.get(fieldName)
    return field.hasError(validationName);
  }

}
