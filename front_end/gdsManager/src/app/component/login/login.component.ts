import { Component } from '@angular/core';
import { AuthGuardService } from '../../service/auth-guard.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isVisible: boolean = false;


  constructor(private authService: AuthGuardService, private router: Router) {}

  login(): void {
    // console.log("Login clicked");
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.storeToken(response.token); // Store token in localStorage
        
        // this.router.navigate(['home/readers']); // Navigate to protected route
        this.router.navigate(['home/readers'])
  .then(success => console.log("Navigation successful:", success))
  .catch(err => console.error("Navigation failed:", err));

      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Invalid credentials';
        this.isVisible = true;
      }
    );
  }

}

