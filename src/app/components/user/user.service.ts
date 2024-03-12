import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }
}
