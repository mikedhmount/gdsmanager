import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { HolidayService } from '../../service/holiday.service';
import { Holiday } from '../../interface/holiday';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalizedString } from '@angular/compiler';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-holiday',
  imports: [ FormsModule, CommonModule],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent implements OnInit{

  constructor(private holidayService: HolidayService){}

  currentHoliday: Holiday = {
    holidayId: 0,
    holidayName: "",
    holidayStart: "",
    holidayEnd: ""
  }

  holidays: Holiday[] = [];
  errorLabel: String = "";

  ngOnInit(): void {
      this.getHolidays();
  }

  getHolidays(){
    this.holidayService.getHolidays().subscribe((response) => {
      this.holidays = response;
    })
  }
  getHoliday(holidayId: number, holidayName: String, holidayStart: string, holidayEnd: string){
    this.currentHoliday.holidayId = holidayId;
    this.currentHoliday.holidayName = holidayName;
    this.currentHoliday.holidayStart = holidayStart;
    this.currentHoliday.holidayEnd = holidayEnd;
    this.errorLabel = "";
  }
  saveHoliday(){
    //    Only ever update
    let dateCheck: boolean = this.checkDates(this.currentHoliday.holidayStart!, this.currentHoliday.holidayEnd!);
    if(dateCheck == false){
      this.errorLabel = "Start date must be before end date!";
      return;
    }
    if(this.currentHoliday.holidayId == 0){
      this.errorLabel = "You must choose a holiday to edit.";
      return;
    }
    if(this.currentHoliday.holidayName == ""){
      this.errorLabel = "Holiday must have a name!";
      return;
    }
    if(this.currentHoliday.holidayStart == "" || this.currentHoliday.holidayEnd == ""){
      this.errorLabel = "Holiday must have a start date and an end date!";
      return;
    }
    this.holidays.forEach(holiday => {
      if(holiday.holidayName == this.currentHoliday.holidayName){
        this.errorLabel = "There is already a holiday named " + this.currentHoliday.holidayName;
        return;
      }
    });
      this.holidayService.updateHoliday(this.currentHoliday).subscribe((response) => {
        this.getHolidays();
        //  Get response
        if(response.message == "Holiday updated"){
          this.errorLabel = this.currentHoliday.holidayName + " updated!";
          this.cleanUp();
        }
      })
    
  }
  cancelHoliday(){
    this.cleanUp();

    this.errorLabel = "";
  }

  deleteHoliday(){
    switch(this.currentHoliday.holidayId){
      case (15250):
        this.currentHoliday.holidayName = "holiday1";
        break;
      case (15251):
        this.currentHoliday.holidayName = "holiday2";
        break;
      case (15252):
        this.currentHoliday.holidayName = "holiday3";
        break;
      case (15253):
        this.currentHoliday.holidayName = "holiday4";
        break;
      case (15254):
        this.currentHoliday.holidayName = "holiday5";
        break;
      case (15255):
        this.currentHoliday.holidayName = "holiday6";
        break;
      case (15256):
        this.currentHoliday.holidayName = "holiday7";
        break;
      case (15257):
        this.currentHoliday.holidayName = "holiday8";
        break;
      case (15258):
        this.currentHoliday.holidayName = "holiday9";
        break;
      case (15259):
        this.currentHoliday.holidayName = "holiday10";
        break;}
      
        this.currentHoliday.holidayStart = null;
        this.currentHoliday.holidayEnd = null;
      
      this.holidayService.updateHoliday(this.currentHoliday).subscribe((response) => {
        this.getHolidays();
        //  Get response
        if(response.message == "Holiday updated"){
          this.errorLabel = "Holiday removed!";
          this.cleanUp();
        }
      })
  }

  checkDates(startDate: String, endDate: String): boolean{
    if(startDate <= endDate){
      return true;
    }
    else{
      return false;
    }
  }

  cleanUp(){
    this.currentHoliday.holidayId = 0;
    this.currentHoliday.holidayName = "";
    this.currentHoliday.holidayStart = "";
    this.currentHoliday.holidayEnd = "";
  }
}
