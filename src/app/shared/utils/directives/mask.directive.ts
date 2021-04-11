import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[formControlName][mask]',
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class MaskDirective {

  @Input() mask: string;

  @Output()
  extractedValue = new EventEmitter<string>();

  @Output()
  formattedText = new EventEmitter<string>();

  constructor(public model: NgControl) {}

  onInputChange(value) {
    switch (this.mask) {
      case 'cnpj':
        this.CNPJMask(value);
        break;

      default:
        break;
    }
  }

  private CNPJMask(value: string): void {

    var values = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    const formattedValue = !values[2] ? values[1] : values[1] + '.' + values[2] + (values[3] ? '.' + values[3] : '') + (values[4] ? '/' + values[4] : '') + (values[5] ? '-' + values[5] : '');

    this.formattedText.emit(formattedValue);
    this.extractedValue.emit(values[0]);
    this.model.valueAccessor.writeValue(formattedValue);

  }

}
