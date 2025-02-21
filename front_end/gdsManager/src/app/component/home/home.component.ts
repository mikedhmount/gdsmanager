import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){
  }

  

  ngOnInit(){
    
  }
}
