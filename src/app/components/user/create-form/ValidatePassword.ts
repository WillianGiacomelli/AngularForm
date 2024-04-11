import { AbstractControl } from '@angular/forms';

export function ValidatePassword(control: AbstractControl): {
  [key: string]: boolean;
} {
  const password = control.value as string;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,20}$/;
  if (passwordRegex.test(password)) {
    return { passwordFormatError: false };
  }
  return { passwordFormatError: true };
}
