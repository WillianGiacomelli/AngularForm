import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent {
  user: User = {
    id: 0,
    email: '',
    password: '',
  };

  emailConfirm!: string;
  passwordConfirm!: string;

  constructor(private userService: UserService, private router: Router) {}

  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;
  userExists: boolean = false;
  passwordIsNotEqual: boolean = false;
  emailIsNotEqual: boolean = false;
  userAlreadyExist: boolean = false;
  inputsEmpty: boolean = false;

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  verifyEmail(): boolean {
    this.emailIsValid = !this.isValidEmail(this.user.email);

    setTimeout(() => {
      this.emailIsValid = false;
    }, 3000);

    if (!this.emailIsValid) {
      return true;
    }

    return false;
  }

  verifyEqualPassword(): boolean {
    if (this.user.password == this.passwordConfirm) {
      return true;
    }
    this.passwordIsNotEqual = true;
    setTimeout(() => {
      this.passwordIsNotEqual = false;
    }, 3000);
    return false;
  }

  verifyEqualEmail(): boolean {
    if (this.user.email == this.emailConfirm) {
      return true;
    }
    this.emailIsNotEqual = true;
    setTimeout(() => {
      this.emailIsNotEqual = false;
    }, 3000);
    return false;
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,20}$/;
    return passwordRegex.test(password);
  }

  verifyPassword(): boolean {
    this.passwordIsValid = this.isValidPassword(this.user.password);

    if (!this.passwordIsValid) {
      this.passwordIsValid = true;
      setTimeout(() => {
        this.passwordIsValid = false;
      }, 3000);
      return false;
    }
    this.passwordIsValid = false;

    return true;
  }

  handleCreate(e: any): void {
    e.preventDefault();
    if (
      this.user.email.length <= 8 ||
      this.user.password.length <= 8 ||
      this.passwordConfirm.length <= 8 ||
      this.emailConfirm.length <= 8
    ) {
      this.inputsEmpty = true;
      setTimeout(() => {
        this.inputsEmpty = false;
      }, 3000);
      return;
    }
    let email = this.verifyEmail();
    let password = this.verifyPassword();
    let confirmPassword = this.verifyEqualPassword();
    let confirmEmail = this.verifyEqualEmail();
    console.log(email, password, confirmEmail, confirmPassword);
    if (email && password) {
      this.userService.login(this.user).subscribe((users) => {
        const userExistsSytems = users.find((u) => u.email === this.user.email);
        if (userExistsSytems) {
          this.userAlreadyExist = true;
        }
        this.userService.create(this.user).subscribe((user) => {
          this.router.navigate(['/login']);
        });
      });
    }
  }
}
