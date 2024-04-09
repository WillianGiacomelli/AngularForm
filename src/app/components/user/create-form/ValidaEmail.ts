import { AbstractControl, FormControl } from "@angular/forms";

export function ValidaEmail(control: AbstractControl, email: FormControl): object {
  const emailConfirm = control.value as string;
  if(email === emailConfirm){
    return { emailConfirmError: false};
  }

  return { emailConfirmError: true};
}
