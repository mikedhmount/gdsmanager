import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../interface/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  // currentSchedule: Schedule = {
  //   scheduleId: 0,
  //   scheduleName: "",
  //   mondayStart: "00:00:00",
  //   mondayEnd: "00:00:00",
  //   tuesdayStart: "00:00:00",
  //   tuesdayEnd: "00:00:00",
  //   wednesdayStart: "00:00:00",
  //   wednesdayEnd: "00:00:00",
  //   thursdayStart: "00:00:00",
  //   thursdayEnd: "00:00:00",
  //   fridayStart: "00:00:00",
  //   fridayEnd: "00:00:00",
  //   saturdayStart: "00:00:00",
  //   saturdayEnd: "00:00:00",
  //   sundayStart: "00:00:00",
  //   sundayEnd: "00:00:00",
  //   holidays: false  
  // }

  getSchedules():Observable<any>{
    return this.http.get("http://localhost:8080/api/schedules");
  }

  saveSchedule(schedule: Schedule):Observable<any>{
    return this.http.put("http://localhost:8080/api/schedule", schedule)
  }
}
