import { AbstractControl, ValidatorFn } from "@angular/forms";

export const  noWhiteSpace: ValidatorFn = ({
  value,
}: AbstractControl) => {
  if (!value || typeof value != "string") return null;

  return value.trim().length > 0 ? null : { whitespace: true };
};
