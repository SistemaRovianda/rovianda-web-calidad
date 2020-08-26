import { AbstractControl } from "@angular/forms";

export function notCharacterEspecial(
  control: AbstractControl
): { [key: string]: boolean | null } {
  let regEx = /^[A-Za-z\sÀ-ÿ\u00f1\u00d1]*$/g;

  if (control.value !== undefined && !regEx.test(control.value)) {
    return { notCharacter: true };
  }
  return null;
}
