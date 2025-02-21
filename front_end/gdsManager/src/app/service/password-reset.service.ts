import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  private baseUrl: String = "http://localhost:8080/";

  changePassword(token: any, password:any):Observable<any>{
    const headers = new HttpHeaders({
      'x-api-key':'H8fhdu&tsd77t88',
      'Content-Type': 'application/json'
    })
    const body = {"token": token, "newPassword": password};
   
    return this.http.post<any>(`${this.baseUrl}auth/password-reset/confirm`,body ,{headers})
  }

  requestChangePassword(email: String):Observable<any>{
    const headers = new HttpHeaders({
      'x-api-key':'H8fhdu&tsd77t88',
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(`${this.baseUrl}auth/password-reset/request?email=${email}`,"");
  }
  

}
