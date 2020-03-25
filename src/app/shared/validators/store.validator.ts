import { Observable } from "rxjs";
import { ValidationErrors, AbstractControl } from "@angular/forms";
import { take, map } from "rxjs/operators";

export class StoreValidators {
  constructor() {}

  static hasStoreError<T>(error: Observable<T>, errorName: string) {
    console.log(error);
    return (
      _: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
      error.pipe(
        take(2),
        map(errors => (!!errors ? { [errorName]: errors } : null))
      );
  }
}
