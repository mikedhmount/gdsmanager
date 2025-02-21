import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordResetService } from '../../service/password-reset.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit{

  password: String ="";
  passwordVerify: String = "";
  isVerified: boolean = false;
  errorLabel:String = "";
  token: string | null = null;

  constructor(private passwordResetService: PasswordResetService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      this.token = this.route.snapshot.queryParamMap.get('token');
  }
  changePassword(){
    if(this.password == "" || this.passwordVerify == ""){
      this.errorLabel = "Both Password and Password Verification are required!";
    }
    this.verifyPassword();
    if(this.isVerified){
      this.passwordResetService.changePassword(this.token,this.password).subscribe((response) => {
        // console.log(response.message)
        this.errorLabel = response.message;
        setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 5000); 

      })
    }

  }

  verifyPassword(){
    if(this.password != this.passwordVerify){
      this.errorLabel = "Passwords do not match!";
      this.isVerified = false;
    }
    else{
      this.errorLabel = "";
      this.isVerified = true;
    }
  }

}
