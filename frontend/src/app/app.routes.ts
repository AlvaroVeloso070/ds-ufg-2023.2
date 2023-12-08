import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from "./vacine/pages/login/login.component";
import {HomeComponent} from "./vacine/pages/home/home.component";
import {ForgotPasswordComponent} from "./vacine/pages/forgot-password/forgot-password.component";
import {ProfileComponent} from "./vacine/pages/profile/profile.component";
import {AppointmentsComponent} from "./vacine/pages/appointments/appointments.component";
import {NewAppointmentComponent} from "./vacine/pages/new-appointment/new-appointment.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent, outlet: 'dashboard'},
  {path: 'home', component: HomeComponent,
    children:[
      {path: 'profile', component: ProfileComponent},
      {path: 'appointments', component: AppointmentsComponent},
      {path: 'appointment/new', component: NewAppointmentComponent},
    ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
