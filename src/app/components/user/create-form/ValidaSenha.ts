import { AbstractControl } from "@angular/forms";

export function ValidaSenha(control: AbstractControl): object {
  const password = control.value as string;
  const passworConfirm = control.value as string;
  if(passworConfirm){
    if(password === passworConfirm){
      return { passwordConfirmError: false};
    }
    return { passwordConfirmError: false};
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,20}$/;
  if(passwordRegex.test(password)){
    return { passwordError: false};
  };
  return { passwordError: true};

}
