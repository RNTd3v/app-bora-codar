import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CnpjValidators {

  static cnpjLength = 14;

  static calc(x: number, numbers: number[]): number {

    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result

  }

  static validate(control: AbstractControl): ValidationErrors | null {

    if (control && control.value) {

      const cnpj = control.value.replace(/[^0-9]+/g,'');


      if ([CnpjValidators.cnpjLength].indexOf(cnpj.length) < 0) {
        return { length: true };
      }

      if (/^([0-9])\1*$/.test(cnpj)) {
        return { equalDigits: true };
      }

      const match = cnpj.toString().match(/\d/g)
      const numbers = Array.isArray(match) ? match.map(Number) : [];

      const digits = numbers.slice(12)

      // Valida 1o. dígito verificador
      const digit0 = CnpjValidators.calc(12, numbers);
      if (digit0 !== digits[0]) {
        return { digit: true };
      }

      // Valida 2o. dígito verificador
      const digit1 = CnpjValidators.calc(13, numbers);
      if (digit1 !== digits[1]) {
        return { digit: true };
      }

      return null;
    }

  }

  validate(control: AbstractControl): ValidationErrors | null {
    return CnpjValidators.validate(control);
  }
}
