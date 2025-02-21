import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Holiday } from '../interface/holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }

  getHolidays():Observable<any>{
    return this.http.get("http://localhost:8080/api/holidays");
  }

  getHoliday(holidayId: number):Observable<any>{
    return this.http.get("http://localhost:8080/api/holiday/(holidayId}");
  }

  saveHoliday(holiday: Holiday):Observable<any>{
    return this.http.post("http://localhost:8080/api/holiday", holiday);
  }

  updateHoliday(holiday: Holiday):Observable<any>{
    return this.http.put("http://localhost:8080/api/holiday", holiday);
  }

  deleteHoliday(holidayId: number):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/holiday/${holidayId}`);
  }
}
