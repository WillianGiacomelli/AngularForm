import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { User } from '../User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  user: User = {
    id: 0,
    email: '',
    password: '',
  };

  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;
  userExists: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

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

  verifyPassword(): boolean {
    if (this.user.password.length < 8) {
      this.passwordIsValid = true;
      setTimeout(() => {
        this.passwordIsValid = false;
      }, 3000);
      return false;
    }
    return true;
  }

  handleLogin(e: any) {
    e.preventDefault();
    let email = this.verifyEmail();
    let password = this.verifyPassword();
    console.log(email, password);
    if (email && password) {
      this.userService.login(this.user).subscribe((users) => {
        const userExistsSytems = users.find((u) => u.email === this.user.email);
        if (!userExistsSytems) {
          this.userExists = true;
          return;
        }
        const user = users.find(
          (u) =>
            u.email === this.user.email && u.password === this.user.password
        );
        if (user) {
          window.localStorage.setItem('user', this.user.email);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  createAccount(e: any) {
    e.preventDefault();
    this.router.navigate(['/create']);
  }
}
