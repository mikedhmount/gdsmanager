import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Group } from '../../interface/group';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Schedule } from '../../interface/schedule';

@Component({
  selector: 'app-group',
  imports: [CommonModule, FormsModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit{

  constructor(private groupService: GroupService){}
  
  currentGroup: Group ={
    groupId: 0,
    groupName: "",
    schedId: 0
  }
  errorLabel: String = "";
  readerMessage: String = "";
  groups: Group[] = [];
  schedules: Schedule[] = [];
  selectedSchedule: number = 11;

  ngOnInit(): void {
      this.getGroups();
      this.getGroupSchedules();
  }

  getGroups(){
      this.groupService.getGroups().subscribe((response) => {
        this.groups = response;
      })
  }
  getGroupSchedules(){
    this.groupService.getGroupSchedules().subscribe((response) => {
      this.schedules = response;
    })
  }

  getGroup(groupId: number, groupName: String, schedId: number){
    this.currentGroup.groupId = groupId;
    this.currentGroup.groupName = groupName;
    this.selectedSchedule = schedId;
    this.errorLabel = "";
  }

  saveGroup(){
    if(this.currentGroup.groupName == ""){
      this.errorLabel = "Group name is required!";
      return;
    }
    if(this.currentGroup.groupId == 0){
      //  Save
      this.currentGroup.schedId = this.selectedSchedule;
      this.groupService.saveGroup(this.currentGroup).subscribe((response) => {
        console.log(response);
        this.errorLabel = "Group " + response.groupName + " saved!";
        this.cleanUp();
      })
      
    }
    else{
      // update
      this.currentGroup.schedId = this.selectedSchedule;
      this.groupService.updateGroup(this.currentGroup).subscribe((response) => {
        this.errorLabel = "Group " + response.groupName + " updated successfully!";
        this.cleanUp();
      })
    }

    
  }
  cleanUp(){
    this.clearGroup();
    this.getGroups();
  }
  cancelGroup(){
    this.clearGroup();
  }
  deleteGroup(){
    this.groupService.deleteGroup(this.currentGroup.groupId).subscribe((response) => {
      if(response.message == "Group deleted successfully"){
        this.errorLabel = this.currentGroup.groupName + " deleted successfully!";
        this.cleanUp();
      }
    })
  }

  clearGroup(){
    this.currentGroup.groupId = 0;
    this.currentGroup.groupName ="";
    this.currentGroup.schedId = 0;
    this.selectedSchedule = 11;
  }
  // authCode: String = "";

  // getReaderGroups(){
  //   this.gdsService.readerAuth(this.currentReader).subscribe((response) => {
  //     parseString(response, (err: any, result: any) => {
  //       if(err) {
  //         console.error('Error parsing: ' + err);
  //         return;
  //       }
  //       this.authCode = CryptoJS.MD5(result.Configuration.ChallengeCode[0] + ":GDS3710lZpRsFzCbM:" + this.currentReader.readerPassword).toString();
  //       console.log(this.authCode);
  //       // this.readerMessage = this.authCode;
  //       this.currentReader.readerSecret = this.authCode;
  //       this.gdsService.readerLogin(this.currentReader).subscribe((response) => {
  //         parseString(response, (err: any, result: any) => {
  //           if(err) {
  //             console.error('Error parsing: ' + err);
  //             return;
  //           }
  //           let oldCookies: String = result.Configuration.Cookies[0]
  //           let newCookies: String = oldCookies.slice(1);
  //           let cookies = newCookies.replace("]","");
  //           this.currentReader.readerCookies = cookies;
  //           console.log("Cookies!! " + cookies);
  //           this.readerMessage = cookies;
  //           this.gdsService.readerGroups(this.currentReader, cookies).subscribe((response) => {
  //           console.log(response);
  //           this.readerMessage = response;
  //         })
  //         })


          // this.readerMessage = response;
          // this.gdsService.readerGroups(this.currentReader).subscribe((response) => {
          //   console.log(response);
          //   this.readerMessage = response;
          // })
  //       })
  //     })
  //   })
  // }
  
}
