import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from '../../interface/schedule';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-schedule',
  imports: [ FormsModule, NgbTimepickerModule, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{

  constructor(private scheduleService: ScheduleService){}

  currentSchedule: Schedule = {
    scheduleId: 0,
    scheduleName: "",
    mondayStart: "00:00",
    mondayEnd: "00:00",
    tuesdayStart: "00:00",
    tuesdayEnd: "00:00",
    wednesdayStart: "00:00",
    wednesdayEnd: "00:00",
    thursdayStart: "00:00",
    thursdayEnd: "00:00",
    fridayStart: "00:00",
    fridayEnd: "00:00",
    saturdayStart: "00:00",
    saturdayEnd: "00:00",
    sundayStart: "00:00",
    sundayEnd: "00:00",
    holidays: false 
  }

  schedules: Schedule[] = [];
  selectHoliday: number = 0;
  errorLabel:String = "";

  // monStartHourStep: number = 0;
  // monStartMinuteStep: number = 0;
  mondayStartTime: any;
  mondayStopTime: any;
  tuesdayStartTime: any;
  tuesdayStopTime: any;
  wednesdayStartTime: any;
  wednesdayStopTime: any;
  thursdayStartTime: any;
  thursdayStopTime: any;
  fridayStartTime: any;
  fridayStopTime: any;
  saturdayStartTime: any;
  saturdayStopTime: any;
  sundayStartTime: any;
  sundayStopTime: any;
  multiStartTime: any;
  multiStopTime: any;

  monChecked: boolean = false;
  tuesChecked: boolean = false;
  wedChecked: boolean = false;
  thursChecked: boolean = false;
  friChecked: boolean = false;
  satChecked: boolean = false;
  sunChecked: boolean = false;

  ngOnInit(): void {
      this.getSchedules();
  }

  saveSchedule(){
    if(this.currentSchedule.scheduleId == 0){
      this.errorLabel = "You must choose a schedule to modify!";
      return;
    }

    let timecheck: boolean = this.checkTimes(this.mondayStartTime.hour.toString().padStart(2, "0") + ":" + this.mondayStartTime.minute.toString().padStart(2, "0") + ":00", this.mondayStopTime.hour.toString().padStart(2, "0") + ":" + this.mondayStopTime.minute.toString().padStart(2, "0") + ":00"); 
    if(!timecheck){
      this.errorLabel = "Monday start time must be before stop time!";
      return;
    }

    timecheck = this.checkTimes(this.tuesdayStartTime.hour.toString().padStart(2, "0") + ":" + this.tuesdayStartTime.minute.toString().padStart(2, "0") + ":00", this.tuesdayStopTime.hour.toString().padStart(2, "0") + ":" + this.tuesdayStopTime.minute.toString().padStart(2, "0") + ":00");
    if(!timecheck){
      this.errorLabel = "Tuesday start time must be before stop time!";
      return;
    }

    timecheck = this.checkTimes(this.wednesdayStartTime.hour.toString().padStart(2, "0") + ":" + this.wednesdayStartTime.minute.toString().padStart(2, "0") + ":00", this.wednesdayStopTime.hour.toString().padStart(2, "0") + ":" + this.wednesdayStopTime.minute.toString().padStart(2, "0") + ":00");
    if(!timecheck){
      this.errorLabel = "Wednesday start time must be before stop time!";
      return;
    }

    timecheck = this.checkTimes(this.thursdayStartTime.hour.toString().padStart(2, "0") + ":" + this.thursdayStartTime.minute.toString().padStart(2, "0") + ":00", this.thursdayStopTime.hour.toString().padStart(2, "0") + ":" + this.thursdayStopTime.minute.toString().padStart(2, "0") + ":00");
    if(!timecheck){
      this.errorLabel = "Thursday start time must be before stop time!";
      return;
    }

    timecheck = this.checkTimes(this.fridayStartTime.hour.toString().padStart(2, "0") + ":" + this.fridayStartTime.minute.toString().padStart(2, "0") + ":00", this.fridayStopTime.hour.toString().padStart(2, "0") + ":" + this.fridayStopTime.minute.toString().padStart(2, "0") + ":00");
    if(!timecheck){
      this.errorLabel = "Friday start time must be before stop time!";
      return;
    }

    timecheck = this.checkTimes(this.saturdayStartTime.hour.toString().padStart(2, "0") + ":" + this.saturdayStartTime.minute.toString().padStart(2, "0") + ":00", this.saturdayStopTime.hour.toString().padStart(2, "0") + ":" + this.saturdayStopTime.minute.toString().padStart(2, "0") + ":00");
    if(!timecheck){
      this.errorLabel = "Saturday start time must be before stop time!";
      return;
    }

    timecheck = this.checkTimes(this.sundayStartTime.hour.toString().padStart(2, "0") + ":" + this.sundayStartTime.minute.toString().padStart(2, "0") + ":00", this.sundayStopTime.hour.toString().padStart(2, "0") + ":" + this.sundayStopTime.minute.toString().padStart(2, "0") + ":00");
    if(!timecheck){
      this.errorLabel = "Sunday start time must be before stop time!";
      return;
    }
    
    this.currentSchedule.mondayStart = this.mondayStartTime.hour.toString().padStart(2, "0") + ":" + this.mondayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.mondayEnd = this.mondayStopTime.hour.toString().padStart(2, "0") + ":" + this.mondayStopTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.tuesdayStart = this.tuesdayStartTime.hour.toString().padStart(2, "0") + ":" + this.tuesdayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.tuesdayEnd = this.tuesdayStopTime.hour.toString().padStart(2, "0") + ":" + this.tuesdayStopTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.wednesdayStart = this.wednesdayStartTime.hour.toString().padStart(2, "0") + ":" + this.wednesdayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.wednesdayEnd = this.wednesdayStopTime.hour.toString().padStart(2, "0") + ":" + this.wednesdayStopTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.thursdayStart = this.thursdayStartTime.hour.toString().padStart(2, "0") + ":" + this.thursdayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.thursdayEnd = this.thursdayStopTime.hour.toString().padStart(2, "0") + ":" + this.thursdayStopTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.fridayStart = this.fridayStartTime.hour.toString().padStart(2, "0") + ":" + this.fridayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.fridayEnd = this.fridayStopTime.hour.toString().padStart(2, "0") + ":" + this.fridayStopTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.saturdayStart = this.saturdayStartTime.hour.toString().padStart(2, "0") + ":" + this.saturdayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.saturdayEnd = this.saturdayStopTime.hour.toString().padStart(2, "0") + ":" + this.saturdayStopTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.sundayStart = this.sundayStartTime.hour.toString().padStart(2, "0") + ":" + this.sundayStartTime.minute.toString().padStart(2, "0") + ":00";
    this.currentSchedule.sundayEnd = this.sundayStopTime.hour.toString().padStart(2, "0") + ":" + this.sundayStopTime.minute.toString().padStart(2, "0") + ":00";
    if(this.selectHoliday == 1){
      this.currentSchedule.holidays = true;
    }
    else{
      this.currentSchedule.holidays = false;
    }
    console.log(this.currentSchedule);
    this.scheduleService.saveSchedule(this.currentSchedule).subscribe((response) => {
      // console.log(response);
      this.getSchedules();
      this.errorLabel = response.message;
    })
  }
  deleteSchedule(){
    if(this.currentSchedule.scheduleId == 0){
      this.errorLabel = "You must choose a schedule to delete!";
      return;
    }
    this.currentSchedule.scheduleName = "schedule_" + this.currentSchedule.scheduleId.toString();
    this.currentSchedule.mondayStart = "00:00";
    this.currentSchedule.mondayEnd = "00:00";
    this.currentSchedule.tuesdayStart = "00:00";
    this.currentSchedule.tuesdayEnd = "00:00";
    this.currentSchedule.wednesdayStart = "00:00";
    this.currentSchedule.wednesdayEnd = "00:00";
    this.currentSchedule.thursdayStart = "00:00";
    this.currentSchedule.thursdayEnd = "00:00";
    this.currentSchedule.fridayStart = "00:00";
    this.currentSchedule.fridayEnd = "00:00";
    this.currentSchedule.saturdayStart = "00:00";
    this.currentSchedule.saturdayEnd = "00:00";
    this.currentSchedule.sundayStart = "00:00";
    this.currentSchedule.sundayEnd = "00:00";
    this.currentSchedule.holidays = false;
    this.scheduleService.saveSchedule(this.currentSchedule).subscribe((response) => {
      this.getSchedules();
      this.errorLabel = "Schedule removed!";
    }) 
  }
  cancelSchedule(){
    this.cleanup();
    this.errorLabel = "";
  }

  getSchedule(scheduleId: number, scheduleName: String, mondayStart: String, mondayEnd: String, tuesdayStart: String, tuesdayEnd: String, wednesdayStart: String, wednesdayEnd: String,
    thursdayStart: String, thursdayEnd: String, fridayStart: String, fridayEnd: String, saturdayStart: String, saturdayEnd: String, sundayStart: String, sundayEnd: String, holidays: boolean
  ){
    this.currentSchedule.scheduleId = scheduleId;
    this.currentSchedule.scheduleName = scheduleName;
    this.currentSchedule.holidays = holidays;
    if(holidays){
      this.selectHoliday = 1;
    }
    else{
      this.selectHoliday = 0;
    }
    this.mondayStartTime = { hour: Number(mondayStart.split(":")[0]), minute: Number(mondayStart.split(":")[1])}
    this.mondayStopTime = { hour: Number(mondayEnd.split(":")[0]), minute: Number(mondayEnd.split(":")[1])}
    this.tuesdayStartTime = { hour: Number(tuesdayStart.split(":")[0]), minute: Number(tuesdayStart.split(":")[1])}
    this.tuesdayStopTime = { hour: Number(tuesdayEnd.split(":")[0]), minute: Number(tuesdayEnd.split(":")[1])}
    this.wednesdayStartTime = { hour: Number(wednesdayStart.split(":")[0]), minute: Number(wednesdayStart.split(":")[1])}
    this.wednesdayStopTime = { hour: Number(wednesdayEnd.split(":")[0]), minute: Number(wednesdayEnd.split(":")[1])}
    this.thursdayStartTime = { hour: Number(thursdayStart.split(":")[0]), minute: Number(thursdayStart.split(":")[1])}
    this.thursdayStopTime = { hour: Number(thursdayEnd.split(":")[0]), minute: Number(thursdayEnd.split(":")[1])}
    this.fridayStartTime = { hour: Number(fridayStart.split(":")[0]), minute: Number(fridayStart.split(":")[1])}
    this.fridayStopTime = { hour: Number(fridayEnd.split(":")[0]), minute: Number(fridayEnd.split(":")[1])}
    this.saturdayStartTime = { hour: Number(saturdayStart.split(":")[0]), minute: Number(saturdayStart.split(":")[1])}
    this.saturdayStopTime = { hour: Number(saturdayEnd.split(":")[0]), minute: Number(saturdayEnd.split(":")[1])}
    this.sundayStartTime = { hour: Number(sundayStart.split(":")[0]), minute: Number(sundayStart.split(":")[1])}
    this.sundayStopTime = { hour: Number(sundayEnd.split(":")[0]), minute: Number(sundayEnd.split(":")[1])}
    
    this.errorLabel = "";
  }



  saveCopySchedule(){
    if(this.currentSchedule.scheduleId == 0){
      this.errorLabel = "You must choose a schedule to modify!";
      return;
    }
    if(this.multiStartTime == null || this.multiStopTime == null){
      this.errorLabel = "You must have a start time and a stop time!";
      return;
    }
    let timecheck: boolean = this.checkTimes(this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00", this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00");
    
    if(!timecheck){
      this.errorLabel = "Start time must be before stop time!";
      return;
    }
    // console.log(this.multiStartTime);
    // console.log(this.multiStopTime);
    if(this.monChecked){
      this.currentSchedule.mondayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.mondayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.mondayStart = this.mondayStartTime.hour.toString().padStart(2, "0") + ":" + this.mondayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.mondayEnd = this.mondayStopTime.hour.toString().padStart(2, "0") + ":" + this.mondayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    if(this.tuesChecked){
      this.currentSchedule.tuesdayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.tuesdayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.tuesdayStart = this.tuesdayStartTime.hour.toString().padStart(2, "0") + ":" + this.tuesdayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.tuesdayEnd = this.tuesdayStopTime.hour.toString().padStart(2, "0") + ":" + this.tuesdayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    if(this.wedChecked){
      this.currentSchedule.wednesdayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.wednesdayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.wednesdayStart = this.wednesdayStartTime.hour.toString().padStart(2, "0") + ":" + this.wednesdayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.wednesdayEnd = this.wednesdayStopTime.hour.toString().padStart(2, "0") + ":" + this.wednesdayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    if(this.thursChecked){
      this.currentSchedule.thursdayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.thursdayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.thursdayStart = this.thursdayStartTime.hour.toString().padStart(2, "0") + ":" + this.thursdayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.thursdayEnd = this.thursdayStopTime.hour.toString().padStart(2, "0") + ":" + this.thursdayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    if(this.friChecked){
      this.currentSchedule.fridayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.fridayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.fridayStart = this.fridayStartTime.hour.toString().padStart(2, "0") + ":" + this.fridayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.fridayEnd = this.fridayStopTime.hour.toString().padStart(2, "0") + ":" + this.fridayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    if(this.satChecked){
      this.currentSchedule.saturdayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.saturdayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.saturdayStart = this.saturdayStartTime.hour.toString().padStart(2, "0") + ":" + this.saturdayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.saturdayEnd = this.saturdayStopTime.hour.toString().padStart(2, "0") + ":" + this.saturdayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    if(this.sunChecked){
      this.currentSchedule.sundayStart = this.multiStartTime.hour.toString().padStart(2, "0") + ":" + this.multiStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.sundayEnd = this.multiStopTime.hour.toString().padStart(2, "0") + ":" + this.multiStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    else{
      this.currentSchedule.sundayStart = this.sundayStartTime.hour.toString().padStart(2, "0") + ":" + this.sundayStartTime.minute.toString().padStart(2, "0") + ":00";
      this.currentSchedule.sundayEnd = this.sundayStopTime.hour.toString().padStart(2, "0") + ":" + this.sundayStopTime.minute.toString().padStart(2, "0") + ":00";
    }
    
    if(this.selectHoliday == 1){
      this.currentSchedule.holidays = true;
    }
    else{
      this.currentSchedule.holidays = false;
    }

    this.scheduleService.saveSchedule(this.currentSchedule).subscribe((response) => {
      this.getSchedules();
      this.errorLabel = response.message;
    })
    // console.log(this.currentSchedule);

  }




  getSchedules(){
    this.scheduleService.getSchedules().subscribe((response) => {
      this.schedules = response;
      this.schedules.pop();
      this.cleanup();
    })
  }

  cleanup(){
    this.currentSchedule.scheduleId = 0;
    this.currentSchedule.scheduleName = "";
    this.mondayStartTime = null;
    this.mondayStopTime = null;
    this.tuesdayStartTime = null;
    this.tuesdayStopTime = null;
    this.wednesdayStartTime = null;
    this.wednesdayStopTime = null;
    this.thursdayStartTime = null;
    this.thursdayStopTime = null;
    this.fridayStartTime = null;
    this.fridayStopTime = null;
    this.saturdayStartTime = null;
    this.saturdayStopTime = null;
    this.sundayStartTime = null;
    this.sundayStopTime = null;
    this.currentSchedule.holidays = false;
  }

  checkTimes(startTime: String, endTime: String): boolean{
    const [hours1, minutes1, seconds1] = startTime.split(":").map(Number);
    const [hours2, minutes2, seconds2] = endTime.split(":").map(Number);

    if(hours1 > hours2){
      return false;
    }
    if(hours1 == hours2){
      if(minutes1 > minutes2){
        return false;
      }
    }
      return true;
  }


}
