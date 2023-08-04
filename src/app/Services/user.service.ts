import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUserUrl = 'https://localhost:7260/api/User'; 

  loginUser(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUserUrl}/Login`, {username, password}, { responseType: 'text' });
  }
}
