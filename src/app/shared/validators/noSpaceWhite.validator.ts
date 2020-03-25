import { AbstractControl } from "@angular/forms";

export function noWhiteSpace(
  control: AbstractControl
): { [key: string]: boolean | null } {
  const regEx = /\s/;
  if (control.value !== undefined && regEx.test(control.value)) {
    return { isValidEmail: true };
  }
  return null;
}
