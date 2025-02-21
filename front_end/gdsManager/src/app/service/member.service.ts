import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../interface/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAllMembers():Observable<any>{
    return this.http.get("http://localhost:8080/api/memberdetails");
  }

  saveMember(member: Member):Observable<any>{
    return this.http.post("http://localhost:8080/api/member", member);
  }
  updateMember(member: Member):Observable<any>{
    return this.http.put("http://localhost:8080/api/member", member);
  }
  deleteMember(memberId: number):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/member/${memberId}`);
  }
}
