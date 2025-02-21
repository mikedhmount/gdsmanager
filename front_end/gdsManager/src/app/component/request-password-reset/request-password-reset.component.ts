import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordResetService } from '../../service/password-reset.service';


@Component({
  selector: 'app-request-password-reset',
  imports: [ CommonModule, FormsModule],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css'
})
export class RequestPasswordResetComponent {

    errorLabel: String = "";
    email: String = "";

    constructor(private passwordResetService: PasswordResetService){}



  requestChangePassword(){
    if(this.email){
       this.passwordResetService.requestChangePassword(this.email).subscribe((response) => {
      this.errorLabel = response.message;
    })
    }
    else{
      this.errorLabel = "You must enter an email address!";
    }
   
  }
}
