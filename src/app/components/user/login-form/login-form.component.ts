import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { User } from '../User';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  user: User = {
    id: 0,
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  handleLogin(e: any) {
    e.preventDefault();
    this.userService.login(this.user).subscribe((users) => {
      const user = users.find(
        (u) => u.email === this.user.email && u.password === this.user.password
      );
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
