import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interface/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  constructor(private userService: UserService){}

  currentUser: User = {
    userId: 1,
    userName: "admin",
    userPassword: "",
    userEmail: ""
  }

  password: String = "";
  errorLabel = "";

  ngOnInit(): void {
      this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe((response) => {
      this.currentUser = response[0];
      
      if(this.currentUser.userEmail == null || this.currentUser.userEmail == ""){
        this.errorLabel = "You do not have an email address setup. If the password is lost, you may lose access!";
      }
    })
  }
  saveUser(){
    if(this.password == ""){
      this.errorLabel = "You must enter a password with at least 8 characters!";
      return;
    }
    this.currentUser.userPassword = this.password;
    this.userService.saveUser(this.currentUser).subscribe((response) => {
      console.log(response);
    })
  }
}
