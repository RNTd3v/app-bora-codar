import { ButtonConfig } from "@cms/core";

export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface FieldConfig {
  type: string;
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  value?: any;
  placeholder?: string;
  hasError?: boolean;
  validations?: Validator[];
  buttonConfig?: ButtonConfig;
  validationArray?: boolean;
}
