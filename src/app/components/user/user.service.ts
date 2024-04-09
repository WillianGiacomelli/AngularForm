import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user);
  }
}
