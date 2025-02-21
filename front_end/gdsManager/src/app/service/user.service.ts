import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any>{
    return this.http.get("http://localhost:8080/api/user")
  }
  saveUser(user: User):Observable<any>{
    return this.http.put("http://localhost:8080/api/user", user)
  }
}
