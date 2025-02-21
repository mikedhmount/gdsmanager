import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../service/auth-guard.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authGuardService: AuthGuardService, private router: Router){}
  
  logout() {
    this.authGuardService.logout();
    this.router.navigate(['login']);
  }
  
}
