import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private readonly apiUrl = 'http://localhost:8080'; // Your API endpoint
  private authSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // console.log("At the service");
    const headers = {'content-Type': 'application/json'};
    const body = {"userName":username, "userPassword": password}
    return this.http
      .post<any>(`${this.apiUrl}/login`,body, {headers})
      .pipe(
        catchError(err => {
          throw new Error('Login failed');
        })
      );
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    this.authSubject.next(true);
    console.log("Token store " + token);
  }

  getToken(): string | null {
    // console.log("Token retrieved " + localStorage.getItem('jwt_token'));
    return localStorage.getItem('jwt_token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.authSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
