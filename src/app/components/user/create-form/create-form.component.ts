import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidaEmail} from './ValidaEmail';
import { ValidaSenha } from './ValidaSenha';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent implements OnInit{

  form!: FormGroup;

  emailConfirm!: string;
  passwordConfirm!: string;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      emailConfirm: ['',[Validators.required, Validators.email, ValidaEmail(email)]],
      password: ['', [Validators.required, ValidaSenha]],
      passwordConfirm: [''],
    });
  }

  userAlreadyExist: boolean = false;



  handleCreate(e: any): void {
    e.preventDefault();
      this.userService.login(this.form.value).subscribe((users) => {
        const userExistsSytems = users.find((u) => u.email === this.form.value.email);
        if (userExistsSytems) {
          this.userAlreadyExist = true;
        }
        this.userService.create(this.form.value).subscribe((user) => {
          this.router.navigate(['/login']);
        });
      });
    }
  }
