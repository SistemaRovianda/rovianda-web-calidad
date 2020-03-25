import { AbstractControl } from "@angular/forms";

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean | null } {
  const regEx = /^(?=.*\d)(?=.*[#$&-.,_]?)(?=.*\w*[A-Z]?)(?=.*\w*[a-z])\S{8,}$/;
  if (control.value !== undefined && !regEx.test(control.value)) {
    return { isValidpassword: true };
  }
  return null;
}
