import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReaderService } from './reader.service';
import { Reader } from '../interface/reader';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GdsService {

  constructor(private http: HttpClient, private readerService: ReaderService) { }

  currentReader: Reader = {
    readerId: 0,
    readerName: "",
    readerIp: "",
    readerPort: "",
    readerUsername: "",
    readerPassword: "",
    readerSecret: ""
  }

  readerAuth(reader: Reader):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post('http://localhost:8080/api/reader/readerAuth', reader , {headers, responseType: 'text'});
  }
  readerLogin(reader: Reader){
    console.log(reader);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post('http://localhost:8080/api/reader/readerLogin', reader , {headers, responseType: 'text'})
  }

  readerGroups(reader: Reader, cookies: any):Observable<any>{
    console.log(reader);
    const headers = new HttpHeaders()
    .set('Cookie', cookies)
    return this.http.post('http://localhost:8080/api/reader/readerGroups', reader , {headers:headers, responseType: 'text'})
  }
}
