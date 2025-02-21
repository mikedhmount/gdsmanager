import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../service/member.service';
import { Member, GenderEnum, AccountEnum } from '../../interface/member';
import { Group } from '../../interface/group';
import { Card } from '../../interface/card';
import { CardService } from '../../service/card.service';
import { GroupService } from '../../service/group.service';



@Component({
  selector: 'app-member',
  imports: [ CommonModule, FormsModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit{

  constructor(private memberService: MemberService, private cardService: CardService, private groupService: GroupService){}


  members: Member[]= [];
  currentMember: Member = {
    memberId: 0,
    memberUsername: "",
    memberPin: null,
    memberGender: GenderEnum.Male,
    cardId: 0,
    memberStartdate: "2025-01-01",
    memberEnddate: "2099-12-31",
    memberVirtualnumber: 1,
    memberSipnumber: "",
    memberCalloutaccount: AccountEnum.Auto,
    memberCell: "",
    memberEmail: "",
    groupId: 0,
    memberEnable: false,
    groupName: "",
    cardNumber: ""
  }

  currentCard: Card = {
    cardId: 0,
    cardNumber: "",
    cardEnabled: false
  }

  cards: Card[] = [];
  oldCard: number = 0;

  groups: Group[] = [];

  selectedGender: string = "Male";
  selectedAccount:string = "Auto";
  selectedCard: number = 0;
  selectedGroup: number = 0;

  // genderEnum =  Object.keys(GenderEnum);
  // accountEnum = AccountEnum;

  enableIsChecked: boolean = false;

  errorLabel: string = "";


  ngOnInit(): void {
    this.getCards();
    this.getAllMembers();
    this.getGroups();
  }

  getCards(){
    this.cardService.getUnusedCards().subscribe((response) => {
      this.cards = response;
    })
  }
  getGroups(){
    this.groupService.getGroups().subscribe((response) => {
      this.groups = response;
    })
  }
  getAllMembers(){
    this.memberService.getAllMembers().subscribe((response) => {
      this.members = response;
    })
  }
  getMember(memberId: number, memberUsername: string, memberPin: number, memberGender: GenderEnum, cardId: number, memberStartdate: string, memberEndDate: string,
     memberVirtualnumber: number, memberSipnumber: string, memberCalloutaccount: AccountEnum, memberCell: string,
    memberEmail: string, groupId: number, memberEnable: boolean, cardNumber: string, groupname: string){
      //  Keep old cardId in case this is updated so that card can be updated as well
      // this.oldCard = cardId;

      this.currentMember.memberId = memberId;
      this.currentMember.memberUsername = memberUsername;
      this.currentMember.memberPin = memberPin;
      this.currentMember.memberGender = memberGender;
      this.currentMember.cardId = cardId;
      this.currentMember.memberStartdate = memberStartdate;
      this.currentMember.memberEnddate = memberEndDate;
      this.currentMember.memberVirtualnumber = memberVirtualnumber;
      this.currentMember.memberSipnumber = memberSipnumber;
      this.currentMember.memberCalloutaccount = memberCalloutaccount;
      this.currentMember.memberCell = memberCell;
      this.currentMember.memberEmail = memberEmail;
      this.currentMember.groupId = groupId;
      this.currentMember.memberEnable = memberEnable;
      this.enableIsChecked = memberEnable;
      this.currentMember.cardNumber = cardNumber;
      this.currentMember.groupName = groupname;
      // this.selectedCard = cardId;
      this.selectedGender = memberGender;
      this.selectedGroup = this.currentMember.groupId;
      this.selectedCard = cardId;
      console.log(this.currentMember);
  }
  saveMember(){
    this.currentMember.memberEnable = this.enableIsChecked;
    if(this.selectedCard == 0 || this.currentMember.memberUsername == ""){
      this.errorLabel = "Member username and card number are required!";
      return;
    }
    // if(this.currentMember.memberPin == null){
    //   this.errorLabel = "Pin must be a number!";
    //   return;
    // }

    if(this.selectedGender == "Male"){
      this.currentMember.memberGender = GenderEnum.Male;
    }
    else{
      this.currentMember.memberGender = GenderEnum.Female;
    }

    if(this.selectedAccount == "Account1"){
      this.currentMember.memberCalloutaccount = AccountEnum.Account1;
    }
    else if(this.selectedAccount == "Account2"){
      this.currentMember.memberCalloutaccount = AccountEnum.Account2;
    }
    else if(this.selectedAccount == "Account3"){
      this.currentMember.memberCalloutaccount = AccountEnum.Account3;
    }
    else if(this.selectedAccount == "Account4"){
      this.currentMember.memberCalloutaccount = AccountEnum.Account4;
    }
    else if(this.selectedAccount == "Auto"){
      this.currentMember.memberCalloutaccount = AccountEnum.Auto;
    }

    this.currentMember.groupId = this.selectedGroup;
    this.currentMember.cardId = this.selectedCard;
    // this.currentMember.cardId = +this.currentMember.cardNumber!;
    // this.currentMember.groupId = Number(this.currentMember.groupId);
    if(this.currentMember.memberId == 0){
      //      Save
      //      Update Card
      console.log(this.selectedCard);
      console.log(this.currentMember);
      this.cardService.getCard(this.currentMember.cardId).subscribe((response) => {
        this.currentCard = response;
          this.currentCard.cardEnabled = true;
        // }
        this.cardService.updateCard(this.currentCard).subscribe((response) => {
          console.log(response);
        })
      })

      this.memberService.saveMember(this.currentMember).subscribe((response) => {
        this.getAllMembers();
        this.errorLabel = this.currentMember.memberUsername + " saved!";
        this.getCards();
        this.cleanup();
        
      })
      
      // console.log(this.currentMember);
    }
    else{
      //      Update
      //    Update Card
      // console.log(this.oldCard);
      this.memberService.updateMember(this.currentMember).subscribe((response) => {
        this.getAllMembers();
        this.errorLabel = this.currentMember.memberUsername + " saved!";
        this.getCards();
        this.cleanup();
        
      })
      // console.log(this.currentMember);
    }
  }
  deleteMember(){
    //    update card
    console.log(this.currentMember);
    this.currentCard.cardId = this.currentMember.cardId;
    this.currentCard.cardNumber = this.currentMember.cardNumber!;
    this.currentCard.cardEnabled = false;
    this.cardService.updateCard(this.currentCard).subscribe((response) => {
      console.log(response.message);
    })
    //    Delete member
    this.memberService.deleteMember(this.currentMember.memberId).subscribe((response) => {
      this.getAllMembers();
      this.getCards();
      this.cleanup();
      this.errorLabel = response.message;
    })
  }
  cleanup(){
    this.currentMember.memberId = 0;
    this.currentMember.memberUsername = "";
    this.currentMember.memberPin = null;
    this.currentMember.memberGender = GenderEnum.Male;
    this.currentMember.cardId = 0;
    this.currentMember.memberStartdate = new Date("yyyy-MM-dd").toLocaleDateString();
    this.currentMember.memberEnddate = "2099-12-31";
    this.currentMember.memberVirtualnumber = 1;
    this.currentMember.memberSipnumber = "";
    this.currentMember.memberCalloutaccount = AccountEnum.Auto;
    this.currentMember.memberCell = "";
    this.currentMember.memberEmail = "";
    this.currentMember.groupId = 0;
    this.currentMember.memberEnable = false;
    this.currentMember.groupName = "";
    this.currentMember.cardNumber = "";
    this.selectedGender = "Male";
    this.selectedGroup = 0;
    this.selectedAccount = "Auto";
    this.selectedCard = 0;
  };

  cancelMember(){
    this.cleanup();
    this.errorLabel = "";
  }

  checkNumber(str: any, message: string):boolean{
    if(str == null){
      this.errorLabel = message + " Must be a number";
      return false;
    }
    else{
      this.errorLabel = "";
      return true;
    }
  }
  
}
