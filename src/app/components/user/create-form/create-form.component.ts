import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidatePassword } from './ValidatePassword';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent implements OnInit {
  protected form!: FormGroup;

  protected isEmailConfirmTheSame!: boolean;
  protected isPasswordConfirmTheSame!: boolean;
  protected userAlreadyExist: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      emailConfirm: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, ValidatePassword]),
      ],
      passwordConfirm: [
        '',
        Validators.compose([Validators.required, ValidatePassword]),
      ],
    });
  }

  public validateConfirmPassword(): void {
    console.log(this.form.value.password, this.form.value.passwordConfirm);
    if (this.form.value.password == this.form.value.passwordConfirm) {
      this.form
        .get('passwordConfirm')
        ?.setErrors({ passwordConfirmIsNotTheSame: false });
    }
    this.form
      .get('passwordConfirm')
      ?.setErrors({ passwordConfirmIsNotTheSame: true });
  }

  public validateConfirmEmail(): void {
    console.log(this.form.value.password, this.form.value.emailConfirm);
    if (this.form.value.password == this.form.value.emailConfirm) {
      this.form
        .get('emailConfirm')
        ?.setErrors({ emailConfirmIsNotTheSame: false });
    }
    this.form
      .get('emailConfirm')
      ?.setErrors({ emailConfirmIsNotTheSame: true });
  }

  public handleCreate(e: any): void {
    e.preventDefault();
    this.userService.login(this.form.value).subscribe((users) => {
      const userExistsSytems = users.find(
        (u) => u.email === this.form.value.email
      );
      if (userExistsSytems) {
        this.userAlreadyExist = true;
      }
      this.userService.create(this.form.value).subscribe((user) => {
        this.router.navigate(['/login']);
      });
    });
  }
}
