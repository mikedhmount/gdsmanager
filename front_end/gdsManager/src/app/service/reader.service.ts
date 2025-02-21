import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reader } from '../interface/reader';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http: HttpClient) { }

  private baseUrl: String = "http://localhost:8080/api/"
  
  getReaders():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(`${this.baseUrl}readers`,{headers});
  }
  getReader(readerId: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(`${this.baseUrl}reader/${readerId}`,{headers});
  }
  deleteReader(readerId: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.delete(`${this.baseUrl}reader/${readerId}`,{headers});
  }
  saveReader(reader: Reader):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(`${this.baseUrl}reader`,reader, {headers})
  }
  updateReader(reader: Reader):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.put(`${this.baseUrl}reader/${reader.readerId}`,reader, {headers});
  }
}
