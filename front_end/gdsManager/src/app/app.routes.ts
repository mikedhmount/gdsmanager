import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PasswordResetComponent } from './component/password-reset/password-reset.component';
import { RequestPasswordResetComponent } from './component/request-password-reset/request-password-reset.component';
import { HomeComponent } from './component/home/home.component';
import { ReaderComponent } from './component/reader/reader.component';
import { AuthGuard } from './guards/auth.guard.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GroupComponent } from './component/group/group.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { HolidayComponent } from './component/holiday/holiday.component';
import { UserComponent } from './component/user/user.component';
import { CardComponent } from './component/card/card.component';
import { MemberComponent } from './component/member/member.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
    { path: 'password-reset/:token', component: PasswordResetComponent},
    { path: 'request-password-reset', component: RequestPasswordResetComponent},
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard], // Protect all child routes
      children: [
        { path: 'readers', component: ReaderComponent},
        { path: 'groups', component: GroupComponent },
        { path: 'schedules', component: ScheduleComponent},
        { path: 'holidays', component: HolidayComponent},
        { path: 'users', component: UserComponent },
        { path: 'cards', component: CardComponent},
        { path: 'members', component: MemberComponent }
      ],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect unknown routes to login
  ];
  
  @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
    export class AppRoutingModule {}
