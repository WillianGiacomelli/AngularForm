import { Component } from '@angular/core';
import { CreateFormComponent } from '../../../components/user/create-form/create-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
  imports: [CreateFormComponent, RouterLink],
})
export class CreateUserComponent {}
