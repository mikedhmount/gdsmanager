import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../interface/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  // currentGroup: Group = {
  //   groupId: 0,
  //   groupName: "",
  //   schedId: 0
  // }

  getGroups():Observable<any>{
    return this.http.get("http://localhost:8080/api/groups");
  }

  getGroup(groupId:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/group/${groupId}`);
  }

  saveGroup(group:Group):Observable<any>{
    return this.http.post("http://localhost:8080/api/group", group);
  }

  updateGroup(group: Group):Observable<any>{
    return this.http.put("http://localhost:8080/api/group", group);
  }

  deleteGroup(groupId: number):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/group/${groupId}`);
  }

  getGroupSchedules():Observable<any>{
    return this.http.get("http://localhost:8080/api/groupSchedule");
  }
}
